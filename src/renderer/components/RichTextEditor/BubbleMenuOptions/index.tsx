import { Editor } from '@tiptap/core'
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  HighlightIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  BlockQuoteIcon,
  TodoListIcon,
  BulletedListIcon,
  OrderedListIcon,
  LinkIcon,
} from 'outline-icons'

import { Container, Option } from './styles'

type BubbleMenuOptionsProps = {
  editor: Editor
}

export function BubbleMenuOptions({ editor }: BubbleMenuOptionsProps) {
  function handleSetLink() {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (!url) {
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <Container
      editor={editor}
      pluginKey="options"
      shouldShow={({ editor, from, to }) => {
        return (
          from !== to && !editor.isActive('link') && !editor.isActive('image')
        )
      }}
      tippyOptions={{ duration: 200 }}
    >
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={!!editor.isActive('bold')}
      >
        <BoldIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={!!editor.isActive('italic')}
      >
        <ItalicIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={!!editor.isActive('strike')}
      >
        <StrikethroughIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={!!editor.isActive('highlight')}
      >
        <HighlightIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={!!editor.isActive('code')}
      >
        <CodeIcon />
      </Option>

      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={!!editor.isActive('heading', { level: 1 })}
      >
        <Heading1Icon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={!!editor.isActive('heading', { level: 2 })}
      >
        <Heading2Icon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={!!editor.isActive('heading', { level: 3 })}
      >
        <Heading3Icon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={!!editor.isActive('blockquote')}
      >
        <BlockQuoteIcon />
      </Option>

      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        isActive={!!editor.isActive('task')}
      >
        <TodoListIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={!!editor.isActive('bullet')}
      >
        <BulletedListIcon />
      </Option>
      <Option
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={!!editor.isActive('ordered')}
      >
        <OrderedListIcon />
      </Option>

      <Option
        type="button"
        onClick={() => {
          if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run()
          } else {
            handleSetLink()
          }
        }}
        isActive={!!editor.isActive('link')}
      >
        <LinkIcon />
      </Option>
    </Container>
  )
}
