import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { ContentContainer, ItemContainer } from './styles'

type RootProps = {
  children: ReactNode
}

export function Root({ children }: RootProps) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}

type TriggerProps = {
  children: ReactNode
}

export function Trigger({ children }: TriggerProps) {
  return <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
}

type ContentProps = {
  children: ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  align?: 'center' | 'end' | 'start'
}

export function Content({ children, side, align }: ContentProps) {
  return (
    <DropdownMenu.Portal>
      <ContentContainer side={side} align={align}>
        {children}
      </ContentContainer>
    </DropdownMenu.Portal>
  )
}

type ItemProps = {
  children: ReactNode
  onClick: () => void
}

export function Item({ children, onClick }: ItemProps) {
  return <ItemContainer onClick={onClick}>{children}</ItemContainer>
}
