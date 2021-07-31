import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from 'blitz'
import { ColorMode, ColorModeScript } from '@chakra-ui/react'
import Cookies from 'universal-cookie'
import { constants } from 'app/core/helpers/constants'
import { theme } from 'app/core/theme'

interface Props {
  initialColorMode?: ColorMode
}
class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
