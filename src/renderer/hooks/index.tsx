import { ReactNode } from 'react'

import { LoadingProvider } from './LoadingHook'

type AppHooksProps = {
  children: ReactNode
}

export function AppHooks({ children }: AppHooksProps) {
  return <LoadingProvider>{children}</LoadingProvider>
}
