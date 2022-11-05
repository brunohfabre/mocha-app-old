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

import { Container, Form } from './styles'

const signUpFormSchema = z
  .object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

type SignUpFormInputs = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const formRef = useRef<FormHandles>(null)

  const { signUp } = useContext(AuthContext)

  async function handleSubmit(data: SignUpFormInputs) {
    try {
      formRef.current?.setErrors({})

      signUpFormSchema.parse(data)

      await signUp(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues)
        formRef.current?.setErrors(getValidationErrors(err))
      }
    }
  }

  return (
    <Container>
      <Heading size="lg">sign up</Heading>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="name"
          placeholder="name"
          autoFocus
        />
        <Input name="phone" type="text" label="phone" placeholder="phone" />
        <Input name="email" type="text" label="email" placeholder="email" />
        <Input
          name="password"
          type="password"
          label="password"
          placeholder="password"
        />
        <Input
          name="confirmPassword"
          type="password"
          label="password confirmation"
          placeholder="password confirmation"
        />
        <Button type="submit">Sign up</Button>
      </Form>

      <Text size="sm">
        Already have an account?{' '}
        <Link to="/sign-in" replace>
          Sign in
        </Link>
      </Text>
    </Container>
  )
}
