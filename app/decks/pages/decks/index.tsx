import { Suspense } from 'react'
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getDecks from 'app/decks/queries/getDecks'
import { getDashboardLayout } from 'app/core/layouts/Dashboard'

const ITEMS_PER_PAGE = 100

export const DecksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ decks, hasMore }] = usePaginatedQuery(getDecks, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Link href={Routes.ShowDeckPage({ deckId: deck.id })}>
              <a>{deck.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const DecksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Decks</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewDeckPage()}>
            <a>Create Deck</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DecksList />
        </Suspense>
      </div>
    </>
  )
}

DecksPage.authenticate = true
DecksPage.getLayout = getDashboardLayout()

export default DecksPage
