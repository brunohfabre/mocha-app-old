import { ChangeEvent, useContext, useRef } from 'react'

import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Avatar } from '@components/Avatar'
import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import Input from '@components/Input'
import { AuthContext } from '@contexts/AuthContext'
import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'
import getValidationErrors from '@utils/getValidationErrors'

import { Container, Content, Footer, Form, ImageContainer } from './styles'

const updateProfileFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
})

type UpdateProfileFormInputs = yup.InferType<typeof updateProfileFormSchema> & {
  file: File
}

export function Profile() {
  const formRef = useRef<FormHandles>(null)
  const avatarFileInputRef = useRef<HTMLInputElement>(null)

  const { user, updateProfile, updateUserAvatar } = useContext(AuthContext)
  const { setLoading } = useLoading()

  async function handleSubmit(data: UpdateProfileFormInputs) {
    try {
      formRef.current?.setErrors({})

      if (data.file) {
        const fileFormData = new FormData()

        fileFormData.append('file', data.file)

        await api.patch('/users/avatar', fileFormData)
      }

      await updateProfileFormSchema.validate(data, {
        abortEarly: false,
      })

      updateProfile(data)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  async function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setLoading(true)

      const file = event.target.files[0]

      const fileFormData = new FormData()

      fileFormData.append('file', file)

      await updateUserAvatar(fileFormData)
    }
  }

  return (
    <Container>
      <Heading>Profile</Heading>

      <Content>
        <ImageContainer>
          <Avatar src={user?.avatarUrl} name={user?.name ?? ''} size="2xl" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button
              type="button"
              onClick={() => avatarFileInputRef.current?.click()}
            >
              Change profile pic
            </Button>
          </div>

          <input
            ref={avatarFileInputRef}
            type="file"
            onChange={handleChangeAvatar}
            style={{ display: 'none' }}
          />
        </ImageContainer>

        <Form ref={formRef} onSubmit={handleSubmit} initialData={user ?? {}}>
          <Input name="name" label="name" placeholder="name" />
          <Input name="email" label="email" placeholder="email" />
          <Input name="phone" label="phone" placeholder="phone" />

          <Footer>
            <Button type="submit">save</Button>
          </Footer>
        </Form>
      </Content>
    </Container>
  )
}
