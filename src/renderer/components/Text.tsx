import { styled } from '@styles/index'

export const Text = styled('p', {
  lineHeight: '160%',
  fontWeight: 400,
  color: '$gray900',

  variants: {
    size: {
      xs: {
        fontSize: '12px',
      },
      sm: {
        fontSize: '14px',
      },
      md: {
        fontSize: '16px',
      },
      lg: {
        fontSize: '18px',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
