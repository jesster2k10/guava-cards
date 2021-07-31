/**
 * Created by Jesse Onolememen. 26/02/2021
 */

import { Avatar, Box, BoxProps, chakra, Spinner, useTheme } from '@chakra-ui/react'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { Suspense } from 'react'
import dayjs from 'dayjs'
import type { GetCurrentUser_User } from '../queries/getCurrentUser'
import { usePersonName } from 'app/core/hooks/usePersonName'

interface Props extends BoxProps {
  user?: GetCurrentUser_User | null
  fallbackToGuest?: boolean
}

const UserRow = ({ user, fallbackToGuest = true, ...props }: Props) => {
  const name = usePersonName(user)

  return (
    <Box textAlign="left" fontSize="0.85rem" d="flex" flexDir="row" alignItems="center" {...props}>
      <Avatar mr={3} name={name?.full} size="xs" rounded="sm" />
      <Box d="flex" flexDir="column">
        <chakra.span fontWeight="medium">{user ? user.username : 'Guest User'}</chakra.span>
        <chakra.span fontSize="xs" color="mode.secondary.600" fontWeight="regular">
          {user ? `Member since ${dayjs(user.createdAt).format('ll')}` : 'You are not signed in'}
        </chakra.span>
      </Box>
    </Box>
  )
}

export const CurrentUserRow = (props: Omit<Props, 'user'>) => {
  const InnerComponent = () => {
    const currentUser = useCurrentUser()
    return <UserRow {...props} user={currentUser} />
  }

  return (
    <Suspense fallback={<Spinner />}>
      <InnerComponent />
    </Suspense>
  )
}

export { UserRow }
