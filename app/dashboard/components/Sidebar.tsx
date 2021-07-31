import { Box, BoxProps, chakra } from '@chakra-ui/react'
import { useLayerStyles } from 'app/core/theme/useLayerStyles'
import { useThemeColors } from 'app/core/theme/useThemeColors'
import { CurrentUserRow } from 'app/users/components/UserRow'
import BisCog from '@meronex/icons/bi/BisCog'
import BsFillPeopleFill from '@meronex/icons/bs/BsFillPeopleFill'
import FaChartPie from '@meronex/icons/fa/FaChartPie'
import HiHome from '@meronex/icons/hi/HiHome'
import MdAdd from '@meronex/icons/ios/MdAdd'
import MdcCardsOutline from '@meronex/icons/mdc/MdcCardsOutline'
import React from 'react'
import { SidebarGroup } from './SidebarGroup'
import { SidebarLink } from './SidebarLink'
import { SidebarFooter } from './SidebarFooter'

export const SIDEBAR_WIDTH = 250

export interface DashboardSidebarProps extends BoxProps {}
export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({}) => {
  const { background, border } = useThemeColors()
  const { touchable } = useLayerStyles()

  return (
    <Box
      as="aside"
      backgroundColor={background['600']}
      borderRightWidth={0.5}
      borderRightColor={border}
      width={SIDEBAR_WIDTH}
      d="flex"
      flexDir="column"
      pos="fixed"
      left={0}
      top={0}
      bottom={0}
    >
      <Box
        {...touchable}
        px={3}
        py={3}
        alignItems="center"
        d="flex"
        justifyContent="space-between"
        as="button"
      >
        <CurrentUserRow />
      </Box>
      <chakra.div flex="1">
        <SidebarGroup mb={5} mt={3}>
          <SidebarLink title="Home" href="/" Icon={HiHome} />
          <SidebarLink title="Decks" href="/decks" Icon={MdcCardsOutline} />
          <SidebarLink title="Shared" href="/share" Icon={BsFillPeopleFill} />
          <SidebarLink title="Analytics" href="/settings/sync" Icon={FaChartPie} />
          <SidebarLink title="Preferences" href="/settings" Icon={BisCog} />
        </SidebarGroup>
        <SidebarGroup
          title="Decks"
          action={() => alert('add decks')}
          actionTitle="Add Deck"
          ActionIcon={MdAdd}
        >
          {/* <DeckList decks={decks} /> */}
        </SidebarGroup>
      </chakra.div>
      <SidebarFooter />
    </Box>
  )
}
