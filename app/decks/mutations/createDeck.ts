import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateDeck = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateDeck), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const deck = await db.deck.findFirst()

  return deck
})
