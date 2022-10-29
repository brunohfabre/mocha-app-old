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

const signUpFormSchema = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

type SignUpFormInputs = yup.InferType<typeof signUpFormSchema>

export function SignUp() {
  const formRef = useRef<FormHandles>(null)

  const { signUp } = useContext(AuthContext)

  async function handleSubmit(data: SignUpFormInputs) {
    try {
      formRef.current?.setErrors({})

      await signUpFormSchema.validate(data, {
        abortEarly: false,
      })

      await signUp(data)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
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
          name="passwordConfirmation"
          type="password"
          label="password confirmation"
          placeholder="password confirmation"
        />
        <Button type="submit">Sign up</Button>
      </Form>

      <Text size="sm">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </Text>
    </Container>
  )
}
