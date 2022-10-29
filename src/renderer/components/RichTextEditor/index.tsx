import { useEffect } from 'react'

import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import { useEditor } from '@tiptap/react'

import { BubbleMenuLink } from './BubbleMenuLink'
import { BubbleMenuOptions } from './BubbleMenuOptions'
import { Commands } from './Commands'
import { suggestion } from './Commands/suggestion'
import { Container, Editor } from './styles'

type OnTaskUpdateData = {
  total: number
  checked: number
}

type RichTextEditorProps = {
  value: string
  onChange: (data: string) => void
  onTaskUpdate: (data: OnTaskUpdateData) => void
}

export function RichTextEditor({
  value,
  onChange,
  onTaskUpdate,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Blockquote,
      Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: "write '/' to insert, or start writing...",
      }),
      History,
      Italic,
      Strike,
      Code,
      Link.configure({
        openOnClick: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Commands.configure({
        suggestion,
      }),
      Image,
    ],
    onUpdate({ editor }) {
      const content = editor.getHTML()

      onChange(content)

      const tasksTotal = (content.match(/taskItem/g) || []).length
      const tasksFinished = (content.match(/data-checked="true"/g) || []).length

      if (tasksTotal) {
        onTaskUpdate({ total: tasksTotal, checked: tasksFinished })
      } else {
        onTaskUpdate({ total: 0, checked: 0 })
      }
    },
  })

  useEffect(() => {
    if (editor?.commands) {
      editor.commands.setContent(value, false, {
        preserveWhitespace: true,
      })
    }
  }, [editor, value])

  return (
    <Container>
      {editor && (
        <>
          <BubbleMenuOptions editor={editor} />
          <BubbleMenuLink editor={editor} />
        </>
      )}

      <Editor editor={editor} />
    </Container>
  )
}
