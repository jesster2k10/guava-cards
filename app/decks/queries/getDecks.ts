import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface GetDecksInput
  extends Pick<Prisma.DeckFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDecksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: decks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.deck.count({ where }),
      query: (paginateArgs) => db.deck.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      decks,
      nextPage,
      hasMore,
      count,
    }
  }
)
