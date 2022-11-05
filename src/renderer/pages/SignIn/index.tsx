import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { z } from 'zod'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import Input from '@components/Input'
import { Text } from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import { getValidationErrors } from '@utils/getValidationErrors'

import { Container, Control, Form } from './styles'

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

type SignInFormInputs = z.infer<typeof signInFormSchema>

export function SignIn() {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(data: SignInFormInputs) {
    try {
      formRef.current?.setErrors({})

      signInFormSchema.parse(data)

      signIn(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        formRef.current?.setErrors(getValidationErrors(err))
      }
    }
  }

  return (
    <Container>
      <Heading size="lg">Sign in</Heading>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="text" label="email" placeholder="email" />

        <Input
          name="password"
          type="password"
          label="password"
          placeholder="password"
        />
        <Control>
          <Text size="sm">
            <Link to="/forgot-password">Forgot password</Link>
          </Text>
        </Control>

        <Button type="submit">Sign In</Button>
      </Form>

      <Text size="sm">
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" replace>
          Sign up for free
        </Link>
      </Text>
    </Container>
  )
}
