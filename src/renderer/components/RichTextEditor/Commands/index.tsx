import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

export const Commands = Extension.create({
  name: 'slash',

  defaultOptions: {
    suggestion: {
      char: '/',
      startOfLine: true,
      command: ({ editor, range, props }: any) => {
        props.id.command({ editor, range, props })
      },
    },
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
