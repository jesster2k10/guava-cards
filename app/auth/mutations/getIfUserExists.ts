import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.zod(
    z.object({
      email: z.string().email().optional(),
      username: z.string().optional(),
    })
  ),
  async ({ email, username }) => {
    const exists = await db.user.findFirst({
      where: {
        email,
        username,
        OR: username
          ? {
              username,
            }
          : undefined,
      },
    })

    console.log(exists)

    return !!exists
  }
)
