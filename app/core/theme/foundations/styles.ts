import { mode, Styles } from '@chakra-ui/theme-tools'

export const styles: Styles = {
  global: (props) => ({
    body: {
      bg: mode('snow.500', 'charcoal.500')(props),
      color: mode('black', 'white')(props),
      height: '100%',
    },
    html: {
      height: '100%',
    },
    all: {
      borderColor: mode('snow.400', 'charcoal.400')(props),
    },
  }),
}
