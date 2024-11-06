import { Image } from '@tamagui/image-next'
import { Text, YStack } from 'tamagui'
import { ToggleThemeButton } from '~/code/ToggleThemeButton'
import { DialogStream } from '~/code/DialogStream'
import { ClientOnly } from '~/code/components'
import oneBall from '~/public/app-icon.png'

export function HomePage() {
  return (
    <YStack bg="$color1" mih="100%" gap="$4" ai="center" jc="center" f={1}>
      <ToggleThemeButton />
      <ClientOnly>
        <DialogStream />
      </ClientOnly>
    </YStack>
  )
}
