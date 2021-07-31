import { Link, useRouter, useMutation, BlitzPage, Routes } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import createDeck from 'app/decks/mutations/createDeck'
import { DeckForm, FORM_ERROR } from 'app/decks/components/DeckForm'

const NewDeckPage: BlitzPage = () => {
  const router = useRouter()
  const [createDeckMutation] = useMutation(createDeck)

  return (
    <div>
      <h1>Create New Deck</h1>

      <DeckForm
        submitText="Create Deck"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDeck}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const deck = await createDeckMutation(values)
            if (!deck) return
            router.push(Routes.ShowDeckPage({ deckId: deck.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.DecksPage()}>
          <a>Decks</a>
        </Link>
      </p>
    </div>
  )
}

NewDeckPage.authenticate = true
NewDeckPage.getLayout = (page) => <Layout title={'Create New Deck'}>{page}</Layout>

export default NewDeckPage
