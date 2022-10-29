import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { api } from '@lib/api'

import { createUseNotesKey } from './keys'
import { Note } from './types'

export const useNotes = (options?: UseQueryOptions<Note[]>) => {
  return useQuery(
    createUseNotesKey(),
    async () => {
      const response = await api.get<Note[]>('/notes')

      return response.data
    },
    options,
  )
}
