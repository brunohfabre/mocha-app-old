import { useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import Input from '@components/Input'
import { Text } from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import { useLoading } from '@hooks/LoadingHook'
import getValidationErrors from '@utils/getValidationErrors'

import { Container, Form } from './styles'

const codeVerificationFormSchema = yup.object({
  code: yup.string().length(6).required(),
})

type CodeVerificationFormInputs = yup.InferType<
  typeof codeVerificationFormSchema
>

export function CodeVerification() {
  const navigate = useNavigate()
  const location = useLocation()

  const { verifyCode } = useContext(AuthContext)

  const { setLoading } = useLoading()

  const formRef = useRef<FormHandles>(null)

  async function handleVerifyCode(data: CodeVerificationFormInputs) {
    try {
      setLoading(true)

      await codeVerificationFormSchema.validate(data, {
        abortEarly: false,
      })

      const { code } = data

      await verifyCode(Number(code))

      const { redirectTo } = location.state as { redirectTo: string }

      navigate(redirectTo)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Heading size="lg">Verification</Heading>

      <Form ref={formRef} onSubmit={handleVerifyCode}>
        <Input name="code" label="code" placeholder="code" autoFocus />

        <Button type="submit">Verify</Button>
      </Form>

      <Text as="a" onClick={() => console.log('on click')}>
        Sign out
      </Text>
    </Container>
  )
}
