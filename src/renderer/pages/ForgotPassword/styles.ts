import { styled } from '@styles/index'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  maxWidth: 1280,
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',

  section: {
    width: '100%',
    height: 64,

    display: 'flex',
    alignItems: 'center',
  },
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
