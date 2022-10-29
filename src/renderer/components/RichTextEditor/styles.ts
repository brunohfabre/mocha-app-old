import { styled } from '@styles/index'
import { PureEditorContent } from '@tiptap/react'

export const Container = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  header: {
    padding: 16,
  },
})

export const Editor = styled(PureEditorContent, {
  flex: 1,
  display: 'flex',

  '.ProseMirror': {
    flex: 1,
    outline: 'none',
    padding: 16,

    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    color: '#111319',

    '> :first-child': {
      marginTop: 0,
    },

    '> *': {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },

    h1: {
      fontSize: '28px',
      fontWeight: 500,

      marginTop: '0.75em',
      marginBottom: '0.25em',
    },

    h2: {
      fontSize: '20px',
      fontWeight: 500,
      marginTop: '1em',
      marginBottom: '0.5em',
    },

    h3: {
      fontSize: '16px',
      fontWeight: 500,
      marginTop: '1em',
      marginBottom: '0.5em',
    },

    strong: {
      fontWeight: 600,
    },

    blockquote: {
      borderLeft: '3px solid rgba(#0d0d0d, 0.1)',
      paddingLeft: '1rem',
    },

    code: {
      padding: 4,
      backgroundColor: 'lightgray',
    },

    p: {
      minHeight: '1.6em',
      lineHeight: '1.6em',
    },

    'ul[data-type="taskList"]': {
      listStyle: 'none',
      padding: 0,

      p: {
        margin: 0,
      },

      li: {
        display: 'flex',

        input: {
          marginTop: 5,
        },

        '> label': {
          flex: '0 0 auto',
          marginRight: '0.5rem',
          userSelect: 'none',
        },

        '> div': {
          flex: '1 1 auto',
        },

        '&[data-checked="true"]': {
          p: {
            textDecoration: 'line-through',
            color: '#394351',
          },
        },
      },
    },

    'ul, ol': {
      padding: '0 1rem',
    },

    'p.is-editor-empty:first-child::before': {
      color: '#adb5bd',
      content: 'attr(data-placeholder)',
      float: 'left',
      height: 0,
      pointerEvents: 'none',
    },
  },
})
