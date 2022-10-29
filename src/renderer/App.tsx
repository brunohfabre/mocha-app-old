import { MemoryRouter } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppProvider } from './contexts'
import { AppHooks } from './hooks'
import { Router } from './routes/Routes'
import { globalStyles } from './styles/global'

globalStyles()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AppHooks>
          <AppProvider>
            <Router />
          </AppProvider>
        </AppHooks>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
