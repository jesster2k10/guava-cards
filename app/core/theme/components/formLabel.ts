import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const FormLabel: ComponentStyleConfig = {
  baseStyle: (props) => ({
    fontWeight: 'medium',
    fontSize: 'sm',
    mb: 1,
    color: mode('blackAlpha.700', 'secondary.400')(props),
  }),
}
