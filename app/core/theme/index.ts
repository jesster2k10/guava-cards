import { extendTheme } from '@chakra-ui/react'
import { Input } from './components/input'
import { Button } from './components/button'
import { Alert } from './components/alert'
import { FormError } from './components/formError'
import { FormLabel } from './components/formLabel'
import { colors } from './foundations/colors'
import { layerStyles } from './foundations/layers'
import { styles } from './foundations/styles'

const theme = extendTheme({
  colors,
  styles,
  layerStyles,
  components: {
    Input,
    Button,
    FormLabel,
    FormError,
    Alert,
  },
  config: {
    initialColorMode: 'light',
    cssVarPrefix: 'gc',
  },
})

export { theme }
export default theme
export type Theme = typeof theme
