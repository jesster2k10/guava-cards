import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '0.25rem',
    shadow: 'sm',
    borderWidth: 1,
    borderColor: 'mode.secondary.200',
  },
  defaultProps: {
    size: 'sm',
  },
}
