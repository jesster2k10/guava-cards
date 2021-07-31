import { UsePersonName_User } from 'app/core/hooks/usePersonName'
import { Ctx } from 'blitz'
import db, { User } from 'db'

export type GetCurrentUser_User = Pick<
  User,
  'id' | 'name' | 'email' | 'role' | 'username' | 'createdAt'
> &
  UsePersonName_User

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      username: true,
      firstName: true,
      lastName: true,
    },
  })

  return user as GetCurrentUser_User
}
