import { styled } from '@styles/index'
import { Form as UForm } from '@unform/web'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16,
  },
})

export const Form = styled(UForm, {
  display: 'flex',
  flexDirection: 'column',
})

export const MemberItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
})
