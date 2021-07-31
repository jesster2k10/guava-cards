import { Box } from '@chakra-ui/react'
import { DashboardSidebar, SIDEBAR_WIDTH } from 'app/dashboard/components/Sidebar'
import { BlitzPage } from 'blitz'
import React, { Suspense } from 'react'
import { getCustomLayout } from './Layout'

interface DashboardLayoutProps {
  className?: string
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <Box d="flex" h="full">
    <DashboardSidebar />
    <Suspense fallback={null}>
      <Box ml={SIDEBAR_WIDTH} p={4}>
        {children}
      </Box>
    </Suspense>
  </Box>
)

export const getDashboardLayout = getCustomLayout(DashboardLayout)
