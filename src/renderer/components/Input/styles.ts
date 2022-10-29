import { styled } from '@styles/index'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  input: {
    border: 'none',

    height: 40,

    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',

    backgroundColor: '$red300',

    '&::placeholder': {
      color: '$gray300',
    },
  },
})
