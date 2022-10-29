import { styled } from '@styles/index'

export const IconButton = styled('button', {
  width: 32,
  height: 32,
  cursor: 'pointer',
  backgroundColor: '$emerald300',
  border: 'none',
  lineHeight: 0,

  svg: {
    width: 16,
    height: 16,
  },

  '&:hover': {
    backgroundColor: '$emerald400',
  },
})
