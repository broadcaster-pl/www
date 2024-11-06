import React, { useRef, useState } from 'react';
import { YStack, GetRef, Input, ScrollView, Text, XStack } from 'tamagui';
import { ClientOnly } from '../ClientOnly';
import { searchService } from '../../services/SearchService';
import { chatService } from '../../services/ChatService';
import { ChatMessage } from './types';
import { useChatFocus, useChatScroll } from './hooks';

const QUICK_ACTIONS = [
    { id: 1, text: "Zostaw numer telefonu do kontaktu" },
    { id: 2, text: "Zaloguj/Zarejestruj się przez email" },
    { id: 3, text: "Jak rozpocząć streaming?" },
    { id: 4, text: "Cennik usług" },
    { id: 5, text: "Pomoc techniczna" },
    { id: 6, text: "Status serwerów" }
];

const WELCOME_MESSAGE: ChatMessage = {
    id: 0,
    type: 'agent',
    content: 'Witaj! Jestem tutaj, aby Ci pomóc. Możesz:\n' +
        '• Zostawić numer telefonu, a my oddzwonimy\n' +
        '• Podać email do szybkiej rejestracji/logowania\n' +
        '• Zadać pytanie o streaming lub naszą platformę\n' +
        '• Uzyskać natychmiastową pomoc techniczną',
    time: ''
};

const ChatSupportContent: React.FC = (): JSX.Element => {
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [awaitingVerification, setAwaitingVerification] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState('');
    const inputRef = useRef<GetRef<typeof Input>>(null);
    const scrollViewRef = useRef<GetRef<typeof ScrollView>>(null);

    const { focusInput } = useChatFocus(inputRef);
    const { scrollToBottom } = useChatScroll(scrollViewRef);

    React.useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    React.useEffect(() => {
        const updateSuggestions = async () => {
            if (inputValue.trim()) {
                const newSuggestions = await chatService.getContextualSuggestions(inputValue);
                setSuggestions(newSuggestions);
            } else {
                setSuggestions([]);
            }
        };

        updateSuggestions();
    }, [inputValue]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent?.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleQuickAction = (text: string) => {
        setInputValue(text);
        focusInput();
    };

    const processMessage = async (content: string): Promise<{ type: 'agent', content: string }> => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(content)) {
            const response = await chatService.processEmail(content);
            setAwaitingVerification(true);
            setVerificationEmail(content);
            return {
                type: 'agent',
                content: response
            };
        }

        // Verification code handling
        if (awaitingVerification && content.length === 6) {
            const isValid = await chatService.verifyCode(content, verificationEmail);
            setAwaitingVerification(false);
            setVerificationEmail('');
            return {
                type: 'agent',
                content: isValid 
                    ? 'Kod weryfikacyjny poprawny. Zostałeś pomyślnie zalogowany.'
                    : 'Nieprawidłowy kod weryfikacyjny. Spróbuj ponownie lub poproś o nowy kod.'
            };
        }

        // Phone number validation
        const phoneRegex = /^[0-9]{9}$/;
        if (phoneRegex.test(content.replace(/\s/g, ''))) {
            const response = await chatService.processPhone(content);
            return {
                type: 'agent',
                content: response
            };
        }

        // Default response with suggestions
        const suggestions = await chatService.getQuickResponses();
        return {
            type: 'agent',
            content: 'Jak mogę Ci pomóc? Możesz:\n' +
                '• Podać email do rejestracji/logowania\n' +
                '• Zostawić numer telefonu do kontaktu\n' +
                '• Lub zapytać o:\n' +
                suggestions.map(s => `  - ${s}`).join('\n')
        };
    };

    const sendMessage = async () => {
        if (inputValue.trim()) {
            const newMessage: ChatMessage = {
                id: messages.length + 1,
                type: 'user',
                content: inputValue,
                time: new Date().toLocaleTimeString('pl-PL', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })
            };

            setMessages(prev => [...prev, newMessage]);
            setInputValue('');
            focusInput();

            // Process the message and get response
            const response = await processMessage(newMessage.content);
            
            setTimeout(() => {
                const responseMessage: ChatMessage = {
                    id: messages.length + 2,
                    type: response.type,
                    content: response.content,
                    time: new Date().toLocaleTimeString('pl-PL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })
                };
                setMessages(prev => [...prev, responseMessage]);
                focusInput();
            }, 1000);
        }
    };

    return (
        <YStack
            position="absolute"
            top={60}
            left={0}
            right={0}
            height="20vh"
            zIndex={1000}
            backgroundColor="$background"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            style={{
                position: 'fixed',
                top: '60px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            } as any}
        >
            <ScrollView
                f={1}
                p="$4"
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                bounces={false}
            >
                <YStack space="$4" pb="$4">
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
                                <Text 
                                    color={message.type === 'user' ? 'white' : '$color'}
                                    whiteSpace="pre-line"
                                >
                                    {message.content}
                                </Text>
                                {message.time && (
                                    <Text
                                        fontSize="$1"
                                        color={message.type === 'user' ? 'white' : '$gray11'}
                                        o={0.7}
                                        mt="$1"
                                    >
                                        {message.time}
                                    </Text>
                                )}
                            </YStack>
                        </XStack>
                    ))}
                </YStack>

                {inputValue === '' && (
                    <YStack space="$2" mt="$4">
                        <Text color="$gray11" fontSize="$3">Popularne zapytania:</Text>
                        <XStack flexWrap="wrap" gap="$2">
                            {QUICK_ACTIONS.map((action) => (
                                <YStack
                                    key={action.id}
                                    backgroundColor="$gray2"
                                    paddingHorizontal="$3"
                                    paddingVertical="$2"
                                    borderRadius="$4"
                                    pressStyle={{ bg: '$gray3' }}
                                    cursor="pointer"
                                    onPress={() => handleQuickAction(action.text)}
                                >
                                    <Text fontSize="$2">{action.text}</Text>
                                </YStack>
                            ))}
                        </XStack>
                    </YStack>
                )}

                {suggestions.length > 0 && inputValue && (
                    <YStack space="$2" mt="$4">
                        <Text color="$gray11" fontSize="$3">Sugestie:</Text>
                        <YStack space="$1">
                            {suggestions.map((suggestion, index) => (
                                <YStack
                                    key={index}
                                    backgroundColor="$gray2"
                                    paddingHorizontal="$3"
                                    paddingVertical="$2"
                                    borderRadius="$4"
                                    pressStyle={{ bg: '$gray3' }}
                                    cursor="pointer"
                                    onPress={() => handleQuickAction(suggestion)}
                                >
                                    <Text fontSize="$2">{suggestion}</Text>
                                </YStack>
                            ))}
                        </YStack>
                    </YStack>
                )}
            </ScrollView>

            <XStack
                p="$3"
                ai="center"
                jc="space-between"
                bg="$color10"
                borderTopLeftRadius="$4"
                borderTopRightRadius="$4"
            >
                <Input
                    ref={inputRef}
                    f={1}
                    size="$4"
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder={awaitingVerification ? "Wprowadź kod weryfikacyjny..." : "Szukaj lub zadaj pytanie..."}
                    onKeyPress={handleKeyPress}
                    borderWidth={0}
                    bg="transparent"
                    color="white"
                    returnKeyType="send"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                />
            </XStack>
        </YStack>
    );
};

export const ChatSupport: React.FC = () => {
    return (
        <ClientOnly>
            <ChatSupportContent />
        </ClientOnly>
    );
};
