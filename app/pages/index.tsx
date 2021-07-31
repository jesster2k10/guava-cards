import { BlitzPage, GetServerSideProps, getSession, Routes, useSession } from 'blitz'
import { getDashboardLayout } from 'app/core/layouts/Dashboard'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { withServerSideProps } from 'app/core/server'

const Home: BlitzPage = () => {
  const session = useSession()
  return (
    <h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </h1>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = getDashboardLayout()
Home.authenticate = true

export const getServerSideProps = withServerSideProps(async (ctx) => {
  const session = await getSession(ctx.req, ctx.res)
  if (!session.userId) {
    return { redirect: { destination: Routes.LoginPage().pathname, permanent: false }, props: {} }
  }

  return { props: {} }
})

export default Home
