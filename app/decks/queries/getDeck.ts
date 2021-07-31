import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetDeck = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetDeck), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const deck = await db.deck.findFirst({ where: { id } })

  if (!deck) throw new NotFoundError()

  return deck
})
