import { styled } from '@styles/index'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  gap: 16,
})

export const InviteItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: 16,

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
})
