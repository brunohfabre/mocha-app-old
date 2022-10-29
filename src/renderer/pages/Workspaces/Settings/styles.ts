import * as Tabs from '@radix-ui/react-tabs'
import { styled } from '@stitches/react'

export const Option = styled(Tabs.Trigger, {
  '&[data-state="active"]': {
    backgroundColor: 'tomato',
  },
})
