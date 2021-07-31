import { resolver, SecurePassword, AuthenticationError } from 'blitz'
import db, { User } from 'db'
import { Login } from '../validations'
import { Role } from 'types'

export type Login_User = Omit<User, 'hashedPassword'>

export const authenticateUser = async (
  rawEmail: string,
  rawPassword: string
): Promise<Login_User> => {
  const email = rawEmail.toLowerCase().trim()
  const password = rawPassword.trim()
  const user = await db.user.findFirst({ where: { email } })
  if (!user) {
    throw new AuthenticationError('Invalid username or password')
  }

  // try {
  let result: symbol

  try {
    result = await SecurePassword.verify(user.hashedPassword, password)
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw new AuthenticationError('The password you entered was incorrect')
    }

    throw error
  }

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
