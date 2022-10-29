import { styled } from '@stitches/react'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 16px',

  form: {
    padding: '0 16px 16px',

    input: {
      fontSize: 28,
      fontWeight: 'bold',
    },
  },

  header: {
    display: 'flex',
    gap: 16,
    padding: '0 16px',
    color: '#9ba6b2',
    fontSize: '14px',
  },

  '.is-active': {
    backgroundColor: 'black',
    color: 'white',
  },

  '.ProseMirror': {
    outline: 'none',

    '.is-empty::before': {
      content: 'attr(data-placeholder)',
      float: 'left',
      color: '#ced4da',
      pointerEvents: 'none',
      height: 0,
    },
  },
})

export const Form = styled(UForm, {
  display: 'flex',
  flexDirection: 'column',

  input: {
    border: 'none',
    outline: 'none',
    padding: 0,
    backgroundColor: 'transparent',

    '&::placeholder': {
      color: 'lightgray',
    },
  },
})

export const CircleProgress = styled('svg', {
  fill: 'none',
  transform: 'rotate(-90deg)',
})
