import * as RadixContextMenu from '@radix-ui/react-context-menu'
import { styled } from '@styles/index'

export const ContentContainer = styled(RadixContextMenu.Content, {
  backgroundColor: '$cardBackground',
  padding: '8px 0',
  borderRadius: 4,
  boxShadow: '0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06)',
  border: '1px solid #f4f5f7',
  minWidth: 192,
})

export const ItemContainer = styled(RadixContextMenu.Item, {
  height: 32,
  padding: '0 12px',

  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'LightGray',
  },
})
