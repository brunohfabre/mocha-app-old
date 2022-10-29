import { ReactNode } from 'react'

import * as RadixContextMenu from '@radix-ui/react-context-menu'

import { ContentContainer, ItemContainer } from './styles'

type RootProps = {
  children: ReactNode
}

export function Root({ children }: RootProps) {
  return <RadixContextMenu.Root>{children}</RadixContextMenu.Root>
}

type TriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: TriggerProps) {
  return <RadixContextMenu.Trigger asChild>{children}</RadixContextMenu.Trigger>
}

type ContentProps = {
  children: ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <RadixContextMenu.Portal>
      <ContentContainer>{children}</ContentContainer>
    </RadixContextMenu.Portal>
  )
}

type ItemProps = {
  children: ReactNode
  onClick: () => void
}

export function Item({ children, onClick }: ItemProps) {
  return <ItemContainer onClick={onClick}>{children}</ItemContainer>
}
