import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateDeck = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateDeck),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const deck = await db.deck.update({ where: { id }, data })

    return deck
  }
)
