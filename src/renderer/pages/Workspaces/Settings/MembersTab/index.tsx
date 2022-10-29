import { useContext, useEffect, useRef, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import Input from '@components/Input'
import Select from '@components/Select'
import { WorkspacesContext } from '@contexts/WorkspacesContext'
import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'
import getValidationErrors from '@utils/getValidationErrors'

import { Container, Form, MemberItem } from './styles'

type User = {
  id: string
  email: string
  name: string
  phone: string
}

type Role = 'ADMIN' | 'USER'

type Member = {
  id: string
  accepted: boolean
  role: Role
  createdAt: string
  user: User
}

const inviteMemberFormSchema = yup.object({
  email: yup.string().email().required(),
  role: yup.string().required(),
})

type InviteMemberFormInputs = yup.InferType<typeof inviteMemberFormSchema>

export function MembersTab() {
  const { setLoading } = useLoading()

  const formRef = useRef<FormHandles>(null)

  const { workspaceSelected } = useContext(WorkspacesContext)

  const [members, setMembers] = useState<Member[]>([])
  const [inviteModalVisible, setInviteModalVisible] = useState(false)

  useEffect(() => {
    async function loadWorkspace() {
      try {
        setLoading(true)

        const response = await api.get(`/workspaces/${workspaceSelected?.id}`)

        setMembers(response.data.members)
      } finally {
        setLoading(false)
      }
    }

    if (workspaceSelected?.id) {
      loadWorkspace()
    }
  }, [workspaceSelected])

  async function handleSubmit(data: InviteMemberFormInputs) {
    try {
      formRef.current?.setErrors({})

      await inviteMemberFormSchema.validate(data, {
        abortEarly: false,
      })

      const { email, role } = data

      const response = await api.post('/invites', {
        to: email,
        role,
      })

      setMembers((prevState) => [...prevState, response.data])
      setInviteModalVisible(false)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  async function handleRemoveMember(id: string) {
    try {
      setLoading(true)

      await api.delete(`/members/${id}`)

      setMembers((prevState) => prevState.filter((member) => member.id !== id))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog.Root
        open={inviteModalVisible}
        onOpenChange={setInviteModalVisible}
      >
        <Dialog.Trigger asChild></Dialog.Trigger>

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
              <Input name="email" label="email" placeholder="email" />
              <Select
                name="role"
                label="role"
                placeholder="role"
                options={[
                  {
                    value: 'USER',
                    label: 'User',
                  },
                  {
                    value: 'ADMIN',
                    label: 'Admin',
                  },
                ]}
              />

              <button type="submit">invite</button>
            </Form>

            <Dialog.Close>X</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Container>
        <header>
          <strong>Members tab</strong>

          <button type="button" onClick={() => setInviteModalVisible(true)}>
            invite member
          </button>
        </header>

        {!members.length && <span>no content</span>}

        {members.map((member) => (
          <MemberItem key={member.id}>
            <div>
              <div>
                <p>{member.user.name}</p>
                <p>{member.user.email}</p>
              </div>

              <span>{member.role}</span>
            </div>

            <div>
              {!member.accepted && <span>pending...</span>}

              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
              >
                remove
              </button>
            </div>
          </MemberItem>
        ))}
      </Container>
    </>
  )
}
