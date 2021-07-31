import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getDeck from 'app/decks/queries/getDeck'
import deleteDeck from 'app/decks/mutations/deleteDeck'

export const Deck = () => {
  const router = useRouter()
  const deckId = useParam('deckId', 'number')
  const [deleteDeckMutation] = useMutation(deleteDeck)
  const [deck] = useQuery(getDeck, { id: deckId })

  return (
    <>
      <Head>
        <title>Deck {deck.id}</title>
      </Head>

      <div>
        <h1>Deck {deck.id}</h1>
        <pre>{JSON.stringify(deck, null, 2)}</pre>

        <Link href={Routes.EditDeckPage({ deckId: deck.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm('This will be deleted')) {
              await deleteDeckMutation({ id: deck.id })
              router.push(Routes.DecksPage())
            }
          }}
          style={{ marginLeft: '0.5rem' }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowDeckPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DecksPage()}>
          <a>Decks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Deck />
      </Suspense>
    </div>
  )
}

ShowDeckPage.authenticate = true
ShowDeckPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDeckPage
