import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FormHandles } from '@unform/core'
import { format, formatDistanceToNow } from 'date-fns'
import debounce from 'lodash.debounce'
import { CheckmarkIcon } from 'outline-icons'

import Input from '@components/Input'
import { RichTextEditor } from '@components/RichTextEditor'
import { Tooltip } from '@components/Tooltip'
import { Note as NoteType, NotesContext } from '@contexts/NotesContext'
import { useLoading } from '@hooks/LoadingHook'
import { api } from '@lib/api'

import { CircleProgress, Container, Form } from './styles'

export function Note() {
  const formRef = useRef<FormHandles>(null)

  const { setLoading } = useLoading()

  const { id } = useParams()

  const { updateNote } = useContext(NotesContext)

  const [content, setContent] = useState('')
  const [tasksCounts, setTasksCount] = useState({ total: 0, checked: 0 })
  const [note, setNote] = useState<NoteType | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    async function loadNote() {
      try {
        setLoading(true)

        const response = await api.get<NoteType>(`/notes/${id}`)

        setNote(response.data)

        const { content, tasksTotal, tasksChecked } = response.data

        setContent(content)
        setTasksCount({
          checked: tasksChecked,
          total: tasksTotal,
        })
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [])

  const update = useCallback(
    debounce(
      async ({ title, content }: { title?: string; content?: string }) => {
        if (id) {
          setIsUpdating(true)

          await updateNote({
            id,
            title: title || 'Untitled',
            content,
          })

          setIsUpdating(false)
        }
      },
      500,
    ),
    [],
  )

  function handleChangeTitle(value: string) {
    update({
      title: value,
      content,
    })
  }

  function handleChangeContent(value: string) {
    const title = formRef.current?.getFieldValue('title')

    update({
      title,
      content: value,
    })
  }

  if (!note) {
    return <strong>shimmer</strong>
  }

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={() => undefined}
        initialData={{ title: note.title !== 'Untitled' ? note.title : '' }}
      >
        <Input
          name="title"
          placeholder="Untitled"
          onChange={(event) => handleChangeTitle(event.target.value)}
        />
      </Form>

      <header>
        <Tooltip
          content={format(new Date(note.updatedAt), 'LLLL do, yyyy h:mm a')}
        >
          <span style={{ alignSelf: 'flex-start' }}>
            Updated {formatDistanceToNow(new Date(note.updatedAt))}
          </span>
        </Tooltip>

        {!!tasksCounts.total && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {tasksCounts.checked === tasksCounts.total ? (
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 8,
                  backgroundColor: '#6C2FFC',
                }}
              >
                <CheckmarkIcon size={14} color="#ffffff" />
              </div>
            ) : (
              <CircleProgress width="16" height="16" viewBox="0 0 16 16">
                <circle
                  cx="8"
                  cy="8"
                  r="5.6"
                  stroke="#dae1e9"
                  strokeWidth="2.5"
                />

                {tasksCounts.checked && (
                  <circle
                    className="percent fifty"
                    cx="8"
                    cy="8"
                    r="5.6"
                    stroke="#6C2FFC"
                    strokeWidth="2.5"
                    pathLength="100"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: `calc(100 - ${
                        (tasksCounts.checked / tasksCounts.total) * 100
                      })`,
                    }}
                  />
                )}
              </CircleProgress>
            )}
            {tasksCounts.checked === tasksCounts.total ? (
              <>{tasksCounts.total} tasks done</>
            ) : (
              <>
                {tasksCounts.checked} of {tasksCounts.total} tasks
              </>
            )}
          </span>
        )}

        {isUpdating && <span>loading...</span>}
      </header>

      <RichTextEditor
        value={content}
        onChange={(value) => {
          handleChangeContent(value)
        }}
        onTaskUpdate={setTasksCount}
      />
    </Container>
  )
}
