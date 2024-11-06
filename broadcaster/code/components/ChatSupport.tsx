import React, { useState, useRef, useEffect } from 'react';
import { YStack, XStack, Text, Button, Input, Theme, ScrollView, GetRef } from 'tamagui';
import { X, Send } from '@tamagui/lucide-icons';
import { ChatPanel, ChatHeader, ChatInput, ChatMessage } from './StyledComponents';

const initialMessages: ChatMessage[] = [
    {
        id: 1,
        type: 'system',
        content: 'Witaj w DialogStream Support. Jak możemy Ci pomóc?',
        time: '10:00'
    },
    {
        id: 2,
        type: 'user',
        content: 'Mam problem z konfiguracją streamu',
        time: '10:01'
    },
    {
        id: 3,
        type: 'agent',
        content: 'Dzień dobry! Z przyjemnością pomogę. Który element konfiguracji sprawia problem?',
        time: '10:02'
    }
];

export const ChatSupport: React.FC = (): JSX.Element => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const scrollViewRef = useRef<GetRef<typeof ScrollView>>(null);

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            requestAnimationFrame(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const currentTime = new Date().toLocaleTimeString('pl-PL', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    type: 'user',
                    content: newMessage,
                    time: currentTime
                }
            ]);
            setNewMessage('');

            // Simulate agent response
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        type: 'agent',
                        content: 'Dziękuję za wiadomość. Nasz konsultant odpowie najszybciej jak to możliwe.',
                        time: new Date().toLocaleTimeString('pl-PL', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })
                    }
                ]);
            }, 1000);
        }
    };

    const getMessageStyle = (type: ChatMessage['type']) => {
        switch (type) {
            case 'user':
                return {
                    backgroundColor: '$blue10',
                    color: 'white',
                    alignSelf: 'flex-end' as const
                };
            case 'agent':
                return {
                    backgroundColor: '$gray2',
                    alignSelf: 'flex-start' as const
                };
            case 'system':
                return {
                    backgroundColor: '$gray1',
                    alignSelf: 'center' as const
                };
        }
    };

    if (!isOpen) {
        return <YStack />;
    }

    return (
        <ChatPanel>
            {/* Header */}
            <ChatHeader>
                <YStack f={1}>
                    <Text color="white" fontWeight="bold">Wsparcie techniczne</Text>
                    <Text color="white" o={0.8} fontSize="$2">Online</Text>
                </YStack>
                <Button
                    chromeless
                    onPress={() => setIsOpen(false)}
                    icon={<X size="$1" color="white" />}
                />
            </ChatHeader>

            {/* Messages */}
            <ScrollView 
                f={1} 
                p="$4" 
                space="$4" 
                ref={scrollViewRef}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {messages.map((message) => (
                    <YStack
                        key={message.id}
                        maxWidth="80%"
                        p="$3"
                        br="$4"
                        mb="$2"
                        {...getMessageStyle(message.type)}
                    >
                        <Text>{message.content}</Text>
                        <Text fontSize="$1" o={0.7} mt="$1">
                            {message.time}
                        </Text>
                    </YStack>
                ))}
            </ScrollView>

            {/* Input */}
            <ChatInput>
                <XStack space="$2">
                    <Input
                        f={1}
                        size="$4"
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Napisz wiadomość..."
                        enterKeyHint="send"
                        onSubmitEditing={sendMessage}
                    />
                    <Theme name="yellow">
                        <Button
                            size="$4"
                            icon={<Send size="$1" />}
                            onPress={sendMessage}
                            disabled={!newMessage.trim()}
                        />
                    </Theme>
                </XStack>
            </ChatInput>
        </ChatPanel>
    );
};
