import { styled } from '@styles/index'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 32,
})

export const Form = styled(UForm, {
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  button: {
    marginTop: 24,
  },
})
