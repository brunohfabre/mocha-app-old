import { useContext, useRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import Input from '@components/Input'
import { WorkspacesContext } from '@contexts/WorkspacesContext'
import getValidationErrors from '@utils/getValidationErrors'

import { Form } from './styles'

const createWorkspaceFormSchema = yup.object({
  name: yup.string().required(),
})

type CreateWorkspaceFormInputs = yup.InferType<typeof createWorkspaceFormSchema>

type CreateWorkspaceProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
}

export function CreateWorkspaceModal({
  open,
  onOpenChange,
}: CreateWorkspaceProps) {
  const formRef = useRef<FormHandles>(null)

  const { createWorkspace } = useContext(WorkspacesContext)

  async function handleSubmit(data: CreateWorkspaceFormInputs) {
    try {
      formRef.current?.setErrors({})

      await createWorkspaceFormSchema.validate(data, {
        abortEarly: false,
      })

      await createWorkspace(data)

      onOpenChange(false)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />

        <Dialog.Content
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" label="name" placeholder="name" />

            <button type="submit">create</button>
          </Form>

          <Dialog.Close>X</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
