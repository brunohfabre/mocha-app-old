import { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import { Text } from '@components/Text'

import { Container } from './styles'

interface Props {
  name: string
  label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export default function Input({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  const isErrored = !!error

  return (
    <Container>
      {label && (
        <Text
          as="label"
          htmlFor={fieldName}
          size="sm"
          style={{ color: isErrored ? 'red' : '' }}
        >
          {label}
        </Text>
      )}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Text size="sm" style={{ color: isErrored ? 'red' : '' }}>
          {error}
        </Text>
      )}
    </Container>
  )
}
