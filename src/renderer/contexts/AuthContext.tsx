import { createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLoading } from '@hooks/LoadingHook'
import { api, baseURL } from '@lib/api'

type User = {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl: string
  hasWorkspaces: boolean
  hasCode: boolean
}

type SignInData = {
  email: string
  password: string
}

type SignUpData = {
  name: string
  phone: string
  email: string
  password: string
}

type UpdateProfileData = {
  name: string
  email: string
  phone: string
}

type AuthContextData = {
  user: User | null
  isSigned: boolean
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => void
  updateProfile: (data: UpdateProfileData) => Promise<void>
  updateUserAvatar: (data: FormData) => Promise<void>
  verifyCode: (code: number) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate()
  const { setLoading } = useLoading()

  const [user, setUser] = useState<User | null>(() => {
    const persistedUser = localStorage.getItem('@mocha:user')

    if (persistedUser) {
      return JSON.parse(persistedUser)
    }

    return null
  })
  const [token, setToken] = useState<string>(() => {
    const persistedToken = localStorage.getItem('@mocha:token')

    if (persistedToken) {
      return JSON.parse(persistedToken)
    }

    return ''
  })

  const isSigned = !!user && !!token

  async function signIn(data: SignInData) {
    try {
      setLoading(true)

      const response = await api.post('/sessions', data)

      setUser(response.data.user)
      setToken(response.data.token)

      localStorage.setItem('@mocha:user', JSON.stringify(response.data.user))
      localStorage.setItem('@mocha:token', JSON.stringify(response.data.token))

      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  async function signUp(data: SignUpData) {
    try {
      setLoading(true)

      const response = await api.post('/users', data)

      setUser(response.data.user)
      setToken(response.data.token)

      localStorage.setItem('@mocha:user', JSON.stringify(response.data.user))
      localStorage.setItem('@mocha:token', JSON.stringify(response.data.token))

      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem('@mocha:user')
    localStorage.removeItem('@mocha:token')
    localStorage.removeItem('@mocha:workspace-selected')

    setUser(null)
    setToken('')
  }

  async function updateProfile(data: UpdateProfileData) {
    try {
      setLoading(true)

      const response = await api.put(`/users/${user?.id}`, data)

      const newUser = { ...user, ...response.data }

      setUser(newUser)

      localStorage.setItem('@mocha:user', JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }

  async function updateUserAvatar(data: FormData) {
    try {
      setLoading(true)

      const response = await api.patch('/users/avatar', data)

      const newAvatarUrl: string = response.data.avatarUrl.includes('http')
        ? response.data.avatarUrl
        : `${baseURL}/files/${response.data.avatarUrl}`

      if (user) {
        const newUser = { ...user, avatarUrl: newAvatarUrl }

        setUser(newUser)

        localStorage.setItem('@mocha:user', JSON.stringify(newUser))
      }
    } finally {
      setLoading(false)
    }
  }

  async function verifyCode(code: number) {
    try {
      setLoading(true)

      await api.patch(`/users/verification-code`, {
        code,
      })

      const newUser = { ...user, hasCode: false } as any

      setUser(newUser)

      localStorage.setItem('@mocha:user', JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigned,
        signIn,
        signUp,
        signOut,
        updateProfile,
        updateUserAvatar,
        verifyCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
