import { styled } from '@stitches/react'

export const Container = styled('div', {
  flex: 1,
  padding: 16,
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 8,

  '& button': {
    padding: 8,
  },
})

export const Note = styled('button', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  backgroundColor: '$gray50',
  cursor: 'pointer',
  border: 'none',
  alignItems: 'stretch',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      padding: '0 8px',
    },
  },

  '> p': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    lineClamp: 3,
    '-webkit-box-orient': 'vertical',
    margin: 8,
  },

  '&:hover': {
    backgroundColor: '$gray100',
  },
})
