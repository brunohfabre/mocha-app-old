import { globalCss, keyframes } from '.'

const bounce = keyframes({
  '0%, 100%': {
    transform: 'translateY(-25%)',
    animationTimingFunction: 'cubic-bezier(.8,0,1,1)',
  },
  '50%': {
    transform: 'none',
    animationTimingFunction: 'cubic-bezier(0,0,.2,1)',
  },
})

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    '--webkit-font-smoothing': 'antialiased',
  },

  'body, button, textarea, input': {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  },

  '#root': {
    width: '100vw',
    height: '100vh',
    display: 'flex',
  },

  a: {
    color: '$emerald300',

    '&:hover': {
      color: '$emerald400',
    },
  },

  '.logo-loading-container': {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    svg: {
      animation: `${bounce} 1s infinite`,
    },
  },
})
