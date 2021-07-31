import { BoxProps, StyleProps, useColorModeValue } from '@chakra-ui/react'

export function useLayerStyles() {
  return {
    touchable: {
      transition: 'all ease-in-out 100ms',
      borderRadius: 0,
      fontSize: '0.95rem',
      py: 2.5,
      _hover: {
        bg: useColorModeValue('snow.800', 'charcoal.300'),
      },
      _active: {
        bg: useColorModeValue('snow.800', 'charcoal.300'),
      },
    },
  }
}

type LayerStyles = ReturnType<typeof useLayerStyles>

export function useLayerStyle(key: keyof LayerStyles) {
  return useLayerStyles()[key]
}
