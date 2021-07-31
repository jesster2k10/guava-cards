import { ComponentStyleConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const Input: ComponentStyleConfig = {
  baseStyle: {},

  parts: ['field'],
  sizes: {},

  variants: {
    filled: (props) => ({
      field: {
        borderWidth: 1,
        borderRadius: '0.25rem',
        borderStyle: 'solid',
        borderColor: mode('mode.secondary.200', 'mode.secondary.100')(props),
        px: 2.5,
        bg: mode('rgba(0, 0, 0, 0.02)', 'blackAlpha.100')(props),
        _placeholder: {
          color: mode('mode.secondary.500', 'mode.secondary.500')(props),
          fontWeight: 'normal',
        },
        _hover: {
          bg: 'transparent',
        },
        _focus: {
          bg: 'transparent',
          boxShadow: '0 0 0 1px var(--gc-colors-brand-500)',
          borderColor: 'brand.500',

          _invalid: {
            boxShadow: '0 0 0 1px var(--gc-colors-red-500)',
          },
        },
        _active: {
          bg: 'transparent',
          boxShadow: '0 0 0 1px var(--gc-colors-brand-500)',
          borderColor: 'brand.500',

          _invalid: {
            boxShadow: '0 0 0 1px var(--gc-colors-red-500)',
          },
        },
        _invalid: {
          borderColor: 'red.500',
        },
      },
    }),
  },

  defaultProps: {
    size: 'sm',
    focusBorderColor: 'brand.500',
    variant: 'filled',
  },
}
