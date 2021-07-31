import { AppProps, ErrorBoundary, useQueryErrorResetBoundary, App as BlitzApp } from 'blitz'
import { AppContext } from 'next/app'
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import { theme } from 'app/core/theme'
import { RootErrorFallback } from 'app/core/components/RootErrorFallback'
import { Cookies, CookiesProvider } from 'react-cookie'
import { DynamicColorMode } from 'app/core/theme/DynamicColorMode'
import { css, Global } from '@emotion/react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const App = ({ Component, pageProps }: AppProps) => {
  const { cookies } = pageProps?._global ?? {}
  const getLayout = Component.getLayout || ((page) => page)
  const colorModeManager = cookies ? cookieStorageManager(cookies) : localStorageManager

  return (
    <CookiesProvider cookies={new Cookies(cookies)}>
      <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
        <DynamicColorMode>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </DynamicColorMode>
        <Global
          styles={css`
            #__next {
              height: 100%;
            }
          `}
        />
      </ChakraProvider>
    </CookiesProvider>
  )
}

export default App
