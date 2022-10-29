import * as RadixAvatar from '@radix-ui/react-avatar'
import { styled } from '@styles/index'

export const Container = styled(RadixAvatar.Root, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  overflow: 'hidden',
  fontWeight: 500,
  color: '#4b5563',

  variants: {
    size: {
      md: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        fontSize: '16px',
      },
      '2xl': {
        width: 128,
        height: 128,
        borderRadius: '50%',
        fontSize: '36px',
      },
    },
  },
})

export const Image = styled(RadixAvatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

export const Fallback = styled(RadixAvatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '#f3f4f6',
})
