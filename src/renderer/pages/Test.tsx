import { useRef } from 'react'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import Select from '@components/Select'

export function Test() {
  const formRef = useRef<FormHandles>(null)

  return (
    <>
      <Form ref={formRef} onSubmit={(data) => console.log(data)}>
        <Select
          name="select"
          label="select"
          options={[
            {
              value: '1',
              label: 'value 1',
            },
            {
              value: '2',
              label: 'value 2',
            },
            {
              value: '3',
              label: 'value 3',
            },
          ]}
        />

        <button type="submit">send</button>
      </Form>

      <button
        type="button"
        onClick={() => formRef.current?.setFieldValue('select', '3')}
      >
        set select value
      </button>
    </>
  )
}
