import { styled } from '@styles/index'

export const Container = styled('button', {
  border: 'none',
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '0 20px',

  backgroundColor: '$emerald300',

  '&:hover': {
    backgroundColor: '$emerald400',
  },
})
