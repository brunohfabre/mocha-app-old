import { styled } from '@styles/index'

export const Heading = styled('strong', {
  lineHeight: '125%',
  fontWeight: 500,
  color: '$gray900',

  variants: {
    size: {
      sm: {
        fontSize: '20px',
      },
      md: {
        fontSize: '24px',
      },
      lg: {
        fontSize: '32px',
      },
      xl: {
        fontSize: '48px',
      },
      '2xl': {
        fontSize: '64px',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})
