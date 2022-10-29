import { Editor, Range } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  TodoListIcon,
  OrderedListIcon,
  BulletedListIcon,
} from 'outline-icons'
import tippy from 'tippy.js'

import { CommandsList } from './CommandsList'

type CommandData = {
  editor: Editor
  range: Range
}

export const suggestion = {
  char: '/',
  startOfLine: true,

  items: ({ query }: any) => {
    return [
      {
        title: 'Big heading',
        command: ({ editor, range }: CommandData) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 1 })
            .run()
        },
        icon: <Heading1Icon />,
      },
      {
        title: 'Medium heading',
        command: ({ editor, range }: CommandData) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 2 })
            .run()
        },
        icon: <Heading2Icon />,
      },
      {
        title: 'Small heading',
        command: ({ editor, range }: CommandData) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 3 })
            .run()
        },
        icon: <Heading3Icon />,
      },

      {
        title: 'Task list',
        command: ({ editor, range }: CommandData) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        },
        icon: <TodoListIcon />,
      },
      {
        title: 'Bulleted list',
        command: ({ editor, range }: CommandData) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
        icon: <BulletedListIcon />,
      },
      {
        title: 'Ordered list',
        command: ({ editor, range }: CommandData) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
        icon: <OrderedListIcon />,
      },
    ].filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
  },

  render: () => {
    let component: any
    let popup: any

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
} as any
