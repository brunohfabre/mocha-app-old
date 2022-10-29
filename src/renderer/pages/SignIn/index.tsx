import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import * as yup from 'yup'

import { Button } from '@components/Button'
import { Heading } from '@components/Heading'
import Input from '@components/Input'
import { Text } from '@components/Text'
import { AuthContext } from '@contexts/AuthContext'
import getValidationErrors from '@utils/getValidationErrors'

import { Container, Form } from './styles'

const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

type SignInFormInputs = yup.InferType<typeof signInFormSchema>

export function SignIn() {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(data: SignInFormInputs) {
    try {
      formRef.current?.setErrors({})

      await signInFormSchema.validate(data, {
        abortEarly: false,
      })

      signIn(data)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
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
