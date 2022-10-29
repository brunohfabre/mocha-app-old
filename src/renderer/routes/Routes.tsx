import { Routes, Route } from 'react-router-dom'

import { DefaultLayout } from '@components/Layouts/DefaultLayout'
import { InternalLayout } from '@components/Layouts/InternalLayout'
import { CodeVerification } from '@pages/CodeVerification'
import { Home } from '@pages/Home'
import { Notes } from '@pages/Notes'
import { Note } from '@pages/Notes/Note'
import { Notifications } from '@pages/Notifications'
import { Settings } from '@pages/Settings'
import { SignIn } from '@pages/SignIn'
import { SignUp } from '@pages/SignUp'
import { Test } from '@pages/Test'
import { WorkspaceCreate } from '@pages/Workspaces/Create'
import { WorkspaceSelect } from '@pages/Workspaces/Select'
import { WorkspaceSettings } from '@pages/Workspaces/Settings'

import { PrivateRoute } from './PrivateRoute'

export function Router() {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/code-verification" element={<CodeVerification />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/notes" element={<Notes />} />
        </Route>

        <Route path="/settings" element={<InternalLayout />}>
          <Route path=":tab" element={<Settings />} />
        </Route>

        <Route path="/notes" element={<InternalLayout />}>
          <Route path=":id" element={<Note />} />
        </Route>

        <Route path="/workspaces">
          <Route path="create" element={<WorkspaceCreate />} />
          <Route path="select" element={<WorkspaceSelect />} />
        </Route>

        <Route path="/workspaces" element={<InternalLayout />}>
          <Route path="settings" element={<WorkspaceSettings />} />
        </Route>

        <Route path="/notifications" element={<InternalLayout />}>
          <Route path=":tab" element={<Notifications />} />
        </Route>
      </Route>
    </Routes>
  )
}
