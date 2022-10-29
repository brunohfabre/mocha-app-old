import { createStitches } from '@stitches/react'

export const { styled, keyframes, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',

      gray50: '#E1E1E6',
      gray100: '#C4C4CC',
      gray200: '#8D8D99',
      gray300: '#7C7C8A',
      gray400: '#505059',
      gray500: '#323238',
      gray600: '#29292E',
      gray700: '#202024',
      gray800: '#121214',
      gray900: '#09090A',

      red300: '#fca5a5',

      emerald300: '#6ee7b7',
      emerald400: '#34d399',

      blue300: '#93C5FD',

      violet200: '#DDD6FE',
      violet300: '#C4B5FD',
      violet400: '#A78BFA',

      cardBackground: '$white',
    },
  },
})
