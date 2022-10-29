import { getShortName } from '@utils/getShortName'

import { Container, Fallback, Image } from './styles'

type AvatarProps = {
  src?: string
  name: string
  size?: 'md' | '2xl'
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  return (
    <Container size={size}>
      <Image src={src} alt="" />
      <Fallback delayMs={600}>{getShortName(name)}</Fallback>
    </Container>
  )
}
