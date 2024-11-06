import { Image } from '@tamagui/image-next'
import { Text, YStack, ScrollView } from 'tamagui'
import { ToggleThemeButton } from '~/code/ToggleThemeButton'
import { DialogStream } from '~/code/DialogStream'
import { ClientOnly } from '~/code/components'
import oneBall from '~/public/app-icon.png'

export function HomePage() {
  return (
    <ScrollView>
      <YStack 
        bg="$color1" 
        minHeight="100vh"
        pb="$4"
      >
        <ToggleThemeButton />
        <ClientOnly>
          <DialogStream />
        </ClientOnly>
        {/* Main content starts here */}
        <YStack 
          ai="center" 
          jc="flex-start" 
          f={1} 
          gap="$4"
          pt="calc(20vh + 60px)" // Space for chat + menu
        >
          {/* Your main content components go here */}
          <Text>Main Content Area</Text>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
