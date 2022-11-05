import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { CaretLeft } from 'phosphor-react'
import { z } from 'zod'

import { Button } from '@components/Button'
import { IconButton } from '@components/IconButton'
import Input from '@components/Input'
import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'
import { getValidationErrors } from '@utils/getValidationErrors'

import { Container, Form } from './styles'

const forgotPasswordFormSchema = z.object({
  email: z.string(),
})

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPassword() {
  const navigate = useNavigate()

  const { setLoading } = useLoading()

  const formRef = useRef<FormHandles>(null)

  async function handleSubmit(data: ForgotPasswordFormInputs) {
    try {
      formRef.current?.setErrors({})

      forgotPasswordFormSchema.parse(data)

      setLoading(true)

      await api.post('/password/forgot', data)

      navigate(-1)
    } catch (err) {
      if (err instanceof z.ZodError) {
        formRef.current?.setErrors(getValidationErrors(err))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <section>
        <IconButton type="button" onClick={() => navigate(-1)}>
          <CaretLeft />
        </IconButton>
      </section>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" label="email" placeholder="email" />
        <Button type="submit">send mail</Button>
      </Form>

      <section></section>
    </Container>
  )
}
