import { chakra, Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { useRouter } from 'blitz'
import RouterLink, { LinkProps as RouterLinkProps } from 'next/link'
import { useMemo } from 'react'

export interface LinkProps extends RouterLinkProps {
  wrapperProps?: Omit<ChakraLinkProps, 'children'>
  children?: React.ReactNode
  activeMode?: 'inclusive' | 'exact'
}

const Link = ({
  wrapperProps,
  children,
  activeMode = 'exact',
  href,
  as,
  ...linkProps
}: LinkProps) => {
  const { asPath } = useRouter()
  const isLinkActive = useMemo(() => {
    switch (activeMode) {
      case 'inclusive':
        return as?.toString().includes(asPath) || href?.toString().includes(asPath)
      default:
        return asPath === as || asPath === href
    }
  }, [href, as, asPath, activeMode])

  return (
    <RouterLink {...linkProps} href={href} as={as} passHref>
      <ChakraLink
        data-active={isLinkActive ? true : undefined}
        aria-current={isLinkActive ? 'page' : undefined}
        {...wrapperProps}
      >
        {children}
      </ChakraLink>
    </RouterLink>
  )
}

export { Link }
