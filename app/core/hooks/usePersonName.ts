import { User } from 'db'
import { PersonName } from '../services/personName'

export type UsePersonName_User = Partial<Pick<User, 'name' | 'firstName' | 'lastName'>>

export function usePersonName(user?: UsePersonName_User | undefined | null) {
  if (!user) return null

  const { name, firstName, lastName } = user
  const names = name?.split(' ')
  const first = firstName ? firstName : names?.[0]
  const last = lastName ? lastName : names?.[names.length - 1]
  if (!first) return null

  return new PersonName(first, last)
}
