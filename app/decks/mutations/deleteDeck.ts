import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteDeck = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteDeck), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const deck = await db.deck.deleteMany({ where: { id } })

  return deck
})
