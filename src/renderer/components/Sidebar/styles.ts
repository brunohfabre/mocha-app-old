import { NavLink } from 'react-router-dom'

import { styled } from '@stitches/react'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  width: 240,

  display: 'flex',
  flexDirection: 'column',

  backgroundColor: '$gray50',

  nav: {
    flex: 1,
    padding: '8px 0',

    display: 'flex',
    flexDirection: 'column',
  },
})

export const ProjectButton = styled('button', {
  height: 48,
  padding: '0 16px',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  lineHeight: 0,

  border: 'none',
  backgroundColor: '$gray50',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$gray100',
  },
})

export const Option = styled(NavLink, {
  color: '$gray900',
  textDecoration: 'none',
  height: 40,
  backgroundColor: '$gray50',

  display: 'flex',
  alignItems: 'center',

  padding: '0 16px',

  '&:hover': {
    color: '$gray900',
    backgroundColor: '$gray100',
  },

  '&.active': {
    backgroundColor: '$gray100',
  },
})

export const Form = styled(UForm, {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: 280,
})
