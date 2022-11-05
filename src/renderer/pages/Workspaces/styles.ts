import { styled } from '@styles/index'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
})

export const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  padding: 16,
  gap: 16,
})

export const Workspace = styled('div', {
  padding: 16,
  gap: 16,
  backgroundColor: '$gray50',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$gray100',
  },
})
