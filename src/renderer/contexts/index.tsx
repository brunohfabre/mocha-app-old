import { ReactNode } from 'react'

import { AuthContextProvider } from './AuthContext'
import { NotesContextProvider } from './NotesContext'
import { WorkspacesContextProvider } from './WorkspacesContext'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthContextProvider>
      <WorkspacesContextProvider>
        <NotesContextProvider>{children}</NotesContextProvider>
      </WorkspacesContextProvider>
    </AuthContextProvider>
  )
}
