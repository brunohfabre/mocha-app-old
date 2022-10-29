import { styled } from '@styles/index'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: 288,

  boxShadow: '0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06)',
  borderRadius: 4,
  padding: '8px 0',

  maxHeight: 320,
  overflow: 'auto',

  border: '1px solid #f4f5f7',

  '> div': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
})

export const Item = styled('button', {
  backgroundColor: '#ffffff',
  border: 'none',
  height: 36,
  fontSize: '14px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 4,

  padding: '0 12px',

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#ddd6fe',
  },

  variants: {
    isSelected: {
      true: {
        backgroundColor: '#ddd6fe',
      },
    },
  },
})
