import { Editor } from '@tiptap/core'

import { Container } from './styles'

type BubbleMenuLinkProps = {
  editor: Editor
}

export function BubbleMenuLink({ editor }: BubbleMenuLinkProps) {
  function handleRemoveLink() {
    editor.chain().focus().unsetLink().run()
  }

  function handleOpenLink() {
    window.open(editor.getAttributes('link').href)
  }

  return (
    <Container
      editor={editor}
      pluginKey="link"
      shouldShow={({ editor }) => editor.isActive('link')}
      tippyOptions={{ duration: 200 }}
    >
      <button onClick={handleOpenLink}>open</button>
      <button onClick={handleRemoveLink}>remove</button>
    </Container>
  )
}
