import { styled } from '@styles/index'
import { BubbleMenu } from '@tiptap/react'

export const Container = styled(BubbleMenu, {
  display: 'flex',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06)',
  border: '1px solid #f4f5f7',
  width: 420,
  borderRadius: 4,
})

export const Option = styled('button', {
  lineHeight: 0,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  margin: 4,

  svg: {
    fill: 'gray',
  },

  variants: {
    isActive: {
      true: {
        svg: {
          fill: '#6C2FFC',
        },
      },
    },
  },
})
