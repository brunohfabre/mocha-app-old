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

import { AuthContext } from './AuthContext'

export type Workspace = {
  id: string
  name: string
  createdAt: string
  ownerId: string
}

type CreateWorkspaceData = {
  name: string
}

type UpdateWorkspaceData = {
  id: string
  name: string
}

type WorkspacesContextData = {
  workspaces: Workspace[]
  createWorkspace: (data: CreateWorkspaceData) => void
  workspaceSelected: Workspace | null
  selectWorkspace: (data: Workspace) => void
  updateWorkspace: (data: UpdateWorkspaceData) => void
  addWorkspace: (data: Workspace) => void
}

export const WorkspacesContext = createContext({} as WorkspacesContextData)

type WorkspacesProviderProps = {
  children: ReactNode
}

export function WorkspacesContextProvider({
  children,
}: WorkspacesProviderProps) {
  const navigate = useNavigate()
  const { setLoading } = useLoading()

  const { isSigned, user } = useContext(AuthContext)

  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [workspaceSelected, setWorkspaceSelected] = useState<Workspace | null>(
    null,
  )

  useEffect(() => {
    async function loadWorkspaces() {
      try {
        setLoading(true)

        const response = await api.get('/workspaces')

        setWorkspaces(response.data)

        if (response.data.length) {
          setWorkspaces(response.data)

          const persistedWorkspaceSelected = localStorage.getItem(
            '@mocha:workspace-selected',
          )

          if (persistedWorkspaceSelected) {
            const workspace = JSON.parse(persistedWorkspaceSelected)
            setWorkspaceSelected(workspace)

            api.defaults.headers.common['x-workspace-selected'] = workspace.id
          } else {
            setWorkspaceSelected(null)

            navigate('/workspaces/select')
          }
        } else {
          setWorkspaces([])

          navigate('/workspaces/create')

          setWorkspaceSelected(null)
        }
      } finally {
        setLoading(false)
      }
    }

    if (isSigned && !user?.hasCode) {
      loadWorkspaces()
    }
  }, [isSigned, user?.hasCode])

  function selectWorkspace(workspace: Workspace) {
    setWorkspaceSelected(workspace)

    localStorage.setItem('@mocha:workspace-selected', JSON.stringify(workspace))

    api.defaults.headers.common['x-workspace-selected'] = workspace.id
  }

  async function createWorkspace(data: CreateWorkspaceData) {
    try {
      setLoading(true)

      const response = await api.post('/workspaces', data)

      setWorkspaces((prevState) => [...prevState, response.data])

      selectWorkspace(response.data)

      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  async function updateWorkspace({ id, name }: UpdateWorkspaceData) {
    try {
      setLoading(true)

      const response = await api.put(`/workspaces/${id}`, {
        name,
      })

      setWorkspaces((prevState) =>
        prevState.map((workspace) =>
          workspace.id === id ? response.data : workspace,
        ),
      )

      selectWorkspace(response.data)
    } finally {
      setLoading(false)
    }
  }

  function addWorkspace(workspace: Workspace) {
    setWorkspaces((prevState) => [...prevState, workspace])
  }

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces,
        createWorkspace,
        workspaceSelected,
        selectWorkspace,
        updateWorkspace,
        addWorkspace,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}
