import * as Tabs from '@radix-ui/react-tabs'
import { styled } from '@styles/index'

export const List = styled(Tabs.List, {
  width: 240,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray50',
  padding: '8px 0',
})

export const Tab = styled(Tabs.Trigger, {
  backgroundColor: '$gray50',
  height: 40,
  display: 'flex',
  padding: '0 16px',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',

  '&[data-state="active"]': {
    backgroundColor: '$gray100',
  },
})
