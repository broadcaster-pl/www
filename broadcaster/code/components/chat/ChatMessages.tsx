import React from 'react';
import { XStack, YStack, Text, ScrollView, GetRef } from 'tamagui';
import { ChatMessage } from './types';

interface ChatMessagesProps {
    messages: ChatMessage[];
    scrollViewRef: React.RefObject<GetRef<typeof ScrollView>>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
    messages,
    scrollViewRef
}) => {
    return (
        <ScrollView
            f={1}
            p="$4"
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
        >
            <YStack space="$4">
                {messages.map((message) => (
                    <XStack
                        key={message.id}
                        jc={message.type === 'user' ? 'flex-end' : 'flex-start'}
                    >
                        <YStack
                            maxWidth="80%"
                            p="$3"
                            br="$4"
                            bg={message.type === 'user' ? '$blue10' : '$gray2'}
                        >
                            <Text color={message.type === 'user' ? 'white' : '$color'}>
                                {message.content}
                            </Text>
                            <Text
                                fontSize="$1"
                                color={message.type === 'user' ? 'white' : '$gray11'}
                                o={0.7}
                                mt="$1"
                            >
                                {message.time}
                            </Text>
                        </YStack>
                    </XStack>
                ))}
            </YStack>
        </ScrollView>
    );
};
