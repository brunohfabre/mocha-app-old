import { styled } from '@stitches/react'
import { Form as UForm } from '@unform/web'

export const Form = styled(UForm, {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: 280,
})
