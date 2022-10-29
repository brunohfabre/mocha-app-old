import { createContext, ReactNode, useContext, useState } from 'react'

import { Container } from './styles'

type LoadingContextData = {
  setLoading: (state: boolean) => void
}

type LoadingProviderProps = {
  children: ReactNode
}

const LoadingContext = createContext({} as LoadingContextData)

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  function setLoading(state: boolean) {
    setIsLoading(state)
  }

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {isLoading && <Container>loading...</Container>}

      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  return context
}
