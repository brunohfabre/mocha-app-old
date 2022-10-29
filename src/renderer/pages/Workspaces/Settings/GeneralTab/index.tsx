import { useContext, useRef } from 'react'

import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import Input from '@components/Input'
import { WorkspacesContext } from '@contexts/WorkspacesContext'
import getValidationErrors from '@utils/getValidationErrors'

import { Container, Form } from './styles'

const updateWorkspaceFormSchema = yup.object({
  name: yup.string().required(),
})

type UpdateWorkspaceFormInputs = yup.InferType<typeof updateWorkspaceFormSchema>

export function GeneralTab() {
  const formRef = useRef<FormHandles>(null)

  const { workspaceSelected, updateWorkspace } = useContext(WorkspacesContext)

  async function handleSubmit(data: UpdateWorkspaceFormInputs) {
    try {
      formRef.current?.setErrors({})

      await updateWorkspaceFormSchema.validate(data, { abortEarly: false })

      if (workspaceSelected?.id) {
        updateWorkspace({ id: workspaceSelected?.id, name: data.name })
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <Container>
      <header>
        <strong>General tab</strong>
      </header>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={workspaceSelected ?? {}}
      >
        <Input name="name" label="name" placeholder="name" />

        <button type="submit">save</button>
      </Form>
    </Container>
  )
}
