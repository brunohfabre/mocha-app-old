import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'

import { WorkspacesContext } from './WorkspacesContext'

export type Note = {
  id: string
  title: string
  content: string
  tasksTotal: number
  tasksChecked: number
  createdAt: string
  updatedAt: string
}

type CreateNoteData = {
  title: string
  content: string
}

type UpdateNoteData = {
  id: string
  title?: string
  content?: string
}

type NotesContextData = {
  createNote: (data: CreateNoteData) => Promise<void>
  updateNote: (data: UpdateNoteData) => Promise<void>
  deleteNote: (id: string) => Promise<void>
}

export const NotesContext = createContext({} as NotesContextData)

type NotesContextProviderProps = {
  children: ReactNode
}

export function NotesContextProvider({ children }: NotesContextProviderProps) {
  const navigate = useNavigate()
  const { setLoading } = useLoading()

  const { workspaceSelected } = useContext(WorkspacesContext)

  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true)

        const response = await api.get('/notes')

        // TODO: setNotes(response.data)
      } finally {
        setLoading(false)
      }
    }

    if (workspaceSelected) {
      loadNotes()
    }
  }, [workspaceSelected])

  async function createNote(data: CreateNoteData) {
    try {
      setLoading(true)

      const response = await api.post('/notes', data)

      // TODO: setNotes((prevState) => [...prevState, response.data])

      navigate(`/notes/${response.data.id}`, {
        replace: true,
      })
    } finally {
      setLoading(false)
    }
  }

  async function updateNote(data: UpdateNoteData) {
    const { title, content } = data

    const response = await api.put(`/notes/${data.id}`, { title, content })

    // TODO:  setNotes((prevState) =>
    //   prevState.map((note) => (note.id === data.id ? response.data : note)),
    // )
  }

  async function deleteNote(id: string) {
    try {
      setLoading(true)

      await api.delete(`/notes/${id}`)

      // TODO: setNotes((prevState) => prevState.filter((note) => note.id !== id))
    } finally {
      setLoading(false)
    }
  }

  return (
    <NotesContext.Provider value={{ createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  )
}
