import React, { ReactNode } from 'react'
import { BlitzPage, Head } from 'blitz'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || 'guava-cards'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export function getCustomLayout<Props = unknown>(
  Component: React.FC<Props>,
  defaultProps: Partial<Props> = {}
) {
  return (props?: Partial<Props> | undefined): BlitzPage['getLayout'] => {
    const getLayout: BlitzPage['getLayout'] = (page) => (
      <Component
        {...({
          ...defaultProps,
          ...props,
        } as Props)}
      >
        {page}
      </Component>
    )
    return getLayout
  }
}
export default Layout
