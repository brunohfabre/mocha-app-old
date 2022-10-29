import { Editor } from '@tiptap/core'

import { Container } from './styles'

type BubbleMenuImageProps = {
  editor: Editor
}

export function BubbleMenuImage({ editor }: BubbleMenuImageProps) {
  function handleRemoveLink() {
    editor.chain().focus().unsetLink().run()
  }

  return (
    <Container
      editor={editor}
      pluginKey="link"
      shouldShow={({ editor }) => editor.isActive('image')}
      tippyOptions={{ duration: 200 }}
    >
      <button onClick={handleRemoveLink}>remove</button>
    </Container>
  )
}
