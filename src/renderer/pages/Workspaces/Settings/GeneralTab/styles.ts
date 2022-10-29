import { styled } from '@styles/index'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 16,
})

export const Form = styled(UForm, {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 320,
})
