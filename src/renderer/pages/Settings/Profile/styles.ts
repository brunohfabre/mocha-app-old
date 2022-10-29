import { styled } from '@stitches/react'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  gap: 32,
})

export const Form = styled(UForm, {
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  button: {
    marginTop: 24,
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 32,
})

export const Content = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
})

export const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
})
