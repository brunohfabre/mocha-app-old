import { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

type Option = {
  value: string
  label: string
}

interface Props {
  name: string
  options: Option[]
  label?: string
}

type SelectProps = JSX.IntrinsicElements['select'] & Props

export default function Select({ name, label, options, ...rest }: SelectProps) {
  const inputRef = useRef<HTMLSelectElement>(null)

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

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <select
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span style={{ color: 'red' }}>{error}</span>}
    </>
  )
}
