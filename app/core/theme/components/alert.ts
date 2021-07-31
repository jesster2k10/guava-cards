import { ComponentStyleConfig } from '@chakra-ui/react'

export const Alert: ComponentStyleConfig = {
  parts: ['container', 'title', 'description', 'icon'],
  baseStyle: (props) => ({
    container: {
      borderRadius: '0.25rem',
      p: 4,
      borderWidth: 1,
      borderColor: `${props.colorScheme}.200`,
      bg: `${props.colorScheme}.50`,
      alignItems: 'flex-start',
    },
    icon: {
      width: 5,
    },
    title: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: `${props.colorScheme}.800`,
      lineHeight: '120%',
    },
    description: {
      color: `${props.colorScheme}.700`,
      fontSize: 'sm',
      lineHeight: '100%',
    },
  }),
}
