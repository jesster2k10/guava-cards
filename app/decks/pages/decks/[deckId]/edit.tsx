import { Suspense } from 'react'
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import getDeck from 'app/decks/queries/getDeck'
import updateDeck from 'app/decks/mutations/updateDeck'
import { DeckForm, FORM_ERROR } from 'app/decks/components/DeckForm'

export const EditDeck = () => {
  const router = useRouter()
  const deckId = useParam('deckId', 'number')
  const [deck, { setQueryData }] = useQuery(
    getDeck,
    { id: deckId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDeckMutation] = useMutation(updateDeck)

  return (
    <>
      <Head>
        <title>Edit Deck {deck.id}</title>
      </Head>

      <div>
        <h1>Edit Deck {deck.id}</h1>
        <pre>{JSON.stringify(deck)}</pre>

        <DeckForm
          submitText="Update Deck"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDeck}
          initialValues={deck}
          onSubmit={async (values) => {
            try {
              const updated = await updateDeckMutation({
                id: deck.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowDeckPage({ deckId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditDeckPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDeck />
      </Suspense>

      <p>
        <Link href={Routes.DecksPage()}>
          <a>Decks</a>
        </Link>
      </p>
    </div>
  )
}

EditDeckPage.authenticate = true
EditDeckPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDeckPage
