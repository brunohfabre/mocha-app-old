import { useContext, useRef } from 'react'

import { styled } from '@stitches/react'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import Input from '@components/Input'
import { AuthContext } from '@contexts/AuthContext'
import { WorkspacesContext } from '@contexts/WorkspacesContext'
import getValidationErrors from '@utils/getValidationErrors'

import { Form } from './styles'

export const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
})

const createWorkspaceFormSchema = yup.object({
  name: yup.string().required(),
})

type createWorkspaceFormInputs = yup.InferType<typeof createWorkspaceFormSchema>

export function WorkspaceCreate() {
  const formRef = useRef<FormHandles>(null)

  const { signOut } = useContext(AuthContext)
  const { createWorkspace } = useContext(WorkspacesContext)

  async function handleSubmit(data: createWorkspaceFormInputs) {
    try {
      formRef.current?.setErrors({})

      await createWorkspaceFormSchema.validate(data, {
        abortEarly: false,
      })

      createWorkspace(data)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <Container>
      <strong>workspace create</strong>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" label="name" placeholder="name" />

        <button type="submit">create workspace</button>
      </Form>

      <button type="button" onClick={signOut}>
        sign out
      </button>
    </Container>
  )
}
