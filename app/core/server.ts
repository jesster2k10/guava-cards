import getCurrentUser from 'app/users/queries/getCurrentUser'
import {
  dehydrate,
  getQueryKey,
  GetServerSideProps,
  invokeWithMiddleware,
  QueryClient,
} from 'blitz'
import merge from 'lodash/merge'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getCurrentUser, null)
  await queryClient.prefetchQuery(queryKey, () => invokeWithMiddleware(getCurrentUser, null, ctx))

  return {
    props: {
      _global: {
        cookies: req.headers.cookie ?? null,
      },
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export const withServerSideProps = (callback: GetServerSideProps): GetServerSideProps => {
  return async (ctx) => {
    const response = await callback(ctx)
    const global = await getServerSideProps(ctx)

    return merge(response, global)
  }
}
