import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { Container, Item } from './styles'

type ItemType = {
  title: string
}

type CommandsListProps = {
  items: ItemType[]
  command: (data: { id: ItemType }) => void
}

export const CommandsList = forwardRef<any, CommandsListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  function selectItem(index: number) {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  function upHandler() {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    )
  }

  function downHandler() {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  function enterHandler() {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <Container>
      <div>
        {props.items.length ? (
          props.items.map((item: any, index: number) => (
            <Item
              key={index}
              onClick={() => selectItem(index)}
              isSelected={index === selectedIndex}
            >
              {item.icon}
              {item.title}
            </Item>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    </Container>
  )
})
