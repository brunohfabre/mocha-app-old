import { z } from 'zod'

type Errors = {
  [key: string]: string
}

export function getValidationErrors(err: z.ZodError): Errors {
  const validationErrors: Errors = {}

  err.issues.forEach(
    (error) => (validationErrors[error.path[0]] = error.message),
  )

  return validationErrors
}
