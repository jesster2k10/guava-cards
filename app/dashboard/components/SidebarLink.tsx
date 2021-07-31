/**
 * Created by Jesse Onolememen. 26/02/2021
 */

import { Box } from '@chakra-ui/react'
import { Link, LinkProps } from 'app/core/components/Link'
import { useLayerStyle } from 'app/core/theme/useLayerStyles'

interface SidebarLinkProps extends LinkProps {
  title: string
  Icon?: React.ComponentType
}

const SidebarLink = ({ title, Icon, ...props }: SidebarLinkProps) => {
  const icon = Icon ? <Icon /> : null
  const extraWrapperProps = useLayerStyle('touchable')

  return (
    <Link
      {...props}
      wrapperProps={{
        ...extraWrapperProps,
        py: 2,
        mx: 2,
        px: 2,
        mb: 0.5,
        rounded: 'md',
        fontSize: '0.85rem',
        d: 'flex',
        flexDir: 'row',
        alignItems: 'center',
        fontWeight: 'medium',
        // layerStyle="block"
        // py={2}
        // mx={2}
        // px={2}
        // mb={0.5}
        // w="auto"
        // rounded="md"
        // fontSize="0.85rem"
        // d="flex"
        // flexDir="row"
        // alignItems="center"
        // className="sidebar-link"
        // exact={false}
      }}
    >
      {icon && (
        <Box aria-hidden mr={2}>
          {icon}
        </Box>
      )}
      <Box lineHeight={1}>{title}</Box>
    </Link>
  )
}

export { SidebarLink }
