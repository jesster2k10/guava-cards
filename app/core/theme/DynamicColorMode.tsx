import { ThemeProvider, useColorMode, useTheme } from '@chakra-ui/react'
import React from 'react'

export const DynamicColorMode: React.FC = ({ children }) => {
  const { colorMode } = useColorMode()
  const theme = useTheme()

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          mode: {
            ...theme.colors,
            ...theme.colors.modes?.[colorMode],
          },
        },
      }}
    >
      {children}
    </ThemeProvider>
  )
}
