import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useNotes } from '@services/notes'
import { DotsThree } from 'phosphor-react'

import { Button } from '@components/Button'
import * as Dropdown from '@components/Dropdown'
import { Heading } from '@components/Heading'
import { IconButton } from '@components/IconButton'
import { Text } from '@components/Text'
import { NotesContext } from '@contexts/NotesContext'

import { Container, Content, Header, Note } from './styles'

export function Notes() {
  const navigate = useNavigate()

  const { createNote, deleteNote } = useContext(NotesContext)

  const { data: notes, isLoading, isFetching } = useNotes()

  function handleDelete(id: string) {
    deleteNote(id)
  }

  function handleCreateNote() {
    createNote({
      title: 'Untitled',
      content: '',
    })
  }

  if (isLoading && !notes) {
    return <div>is loading...</div>
  }

  return (
    <Container>
      <Header>
        <div>
          <Heading size="sm">notes</Heading>{' '}
          {isFetching && <strong>is fetching</strong>}
        </div>
        <Button type="button" onClick={handleCreateNote}>
          Add note
        </Button>
      </Header>

      <Content>
        {!notes?.length && <p>no content</p>}

        {notes?.map((note) => (
          <Note key={note.id} onClick={() => navigate(`/notes/${note.id}`)}>
            <header>
              <Text>{note.title}</Text>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <IconButton>
                    <DotsThree />
                  </IconButton>
                </Dropdown.Trigger>

                <Dropdown.Content align="end">
                  <Dropdown.Item onClick={() => handleDelete(note.id)}>
                    delete
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            </header>

            <Text size="sm">{note.content}</Text>
          </Note>
        ))}
      </Content>
    </Container>
  )
}
