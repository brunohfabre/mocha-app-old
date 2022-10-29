import { ReactNode } from 'react'

import * as RadixTooltip from '@radix-ui/react-tooltip'

import { Container } from './styles'

type TooltipProps = {
  children: ReactNode
  content: string
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <Container>
            <RadixTooltip.Arrow />

            {content}
          </Container>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
