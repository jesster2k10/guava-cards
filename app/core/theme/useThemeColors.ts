import { useColorMode, useColorModeValue, useTheme } from '@chakra-ui/react'
import { Theme } from '.'

export function useThemeColors() {
  const { colors } = useTheme<Theme>()

  return {
    background: useColorModeValue(colors.snow, colors.charcoal),
    border: useColorModeValue(colors.snow[700], colors.charcoal[400]),
  }
}
