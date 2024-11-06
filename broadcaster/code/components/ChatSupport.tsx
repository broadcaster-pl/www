import React, { useEffect, useRef, useState } from 'react';
import { YStack, XStack, Text, Button, Input, ScrollView, GetRef, Stack } from 'tamagui';
import { X, Send, Search, MessageCircle } from '@tamagui/lucide-icons';
import { ChatContainer, ChatPanel, ChatMessage } from './StyledComponents';
import { ClientOnly } from './ClientOnly';
import { searchService } from '../services/SearchService';

const ChatSupportContent: React.FC = (): JSX.Element => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const inputRef = useRef<GetRef<typeof Input>>(null);
    const scrollViewRef = useRef<GetRef<typeof ScrollView>>(null);
    const chatContainerRef = useRef<GetRef<typeof YStack>>(null);
    const [isDocked, setIsDocked] = useState(false);

    const focusInput = () => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollViewRef.current) {
                const scrollView = scrollViewRef.current as any;
                scrollView.scrollToEnd?.({ animated: true });
            }
        }, 100);
    };

    // Handle clicks outside chat
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatContainerRef.current && 
                !(chatContainerRef.current as any).contains(event.target as Node)) {
                setIsExpanded(false);
                setIsDocked(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        if (isExpanded && messages.length > 0) {
            scrollToBottom();
        }
        if (isExpanded) {
            focusInput();
        }
    }, [isExpanded]);

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            setIsDocked(true);
            setIsExpanded(false);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey && document.activeElement !== inputRef.current) {
                e.preventDefault();
                focusInput();
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (inputValue.trim()) {
                const results = await searchService.search(inputValue);
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
        };

        fetchResults();
    }, [inputValue]);

    const handleInputFocus = (e?: any) => {
        e?.preventDefault();
        if (!isExpanded) {
            setIsExpanded(true);
            setIsDocked(false);
        }
        if (messages.length > 0) {
            scrollToBottom();
        }
        focusInput();
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (!isExpanded && value.length > 0) {
            setIsExpanded(true);
            setIsDocked(false);
            focusInput();
        }
    };

    const handleKeyPress = (e: any) => {
        if (e.nativeEvent?.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
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

            setTimeout(() => {
                const responseMessage: ChatMessage = {
                    id: messages.length + 2,
                    type: 'agent',
                    content: 'Dziękuję za wiadomość. Jak mogę pomóc?',
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

    const handleSearchResultClick = (title: string) => {
        setInputValue(title);
        focusInput();
    };

    const InputContainer = ({ children }: { children: React.ReactNode }) => (
        <XStack
            p="$3"
            ai="center"
            jc="space-between"
            bg="$color10"
            br="$4"
            shadowColor="$shadowColor"
            shadowRadius={20}
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.2}
            width="100%"
            onPress={(e) => {
                e.preventDefault();
                handleInputFocus();
            }}
        >
            {children}
        </XStack>
    );

    const ChatContent = () => (
        <YStack
            ref={chatContainerRef}
            animation="quick"
            width="100%"
            height={isExpanded ? "60vh" : 50}
            onPress={(e) => {
                e.stopPropagation();
                focusInput();
            }}
        >
            {!isExpanded ? (
                <InputContainer>
                    <Input
                        ref={inputRef}
                        f={1}
                        size="$4"
                        value={inputValue}
                        onChangeText={handleInputChange}
                        placeholder="Szukaj lub rozpocznij czat..."
                        onFocus={handleInputFocus}
                        onKeyPress={handleKeyPress}
                        borderWidth={0}
                        bg="transparent"
                        color="white"
                        returnKeyType="send"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    />
                    <Button
                        size="$3"
                        chromeless
                        icon={<Search size="$1" color="white" />}
                        onPress={handleInputFocus}
                    />
                </InputContainer>
            ) : (
                <YStack f={1} bg="$background" ov="hidden" br="$4">
                    {searchResults.length > 0 && inputValue && !messages.length ? (
                        <ScrollView f={1} p="$4">
                            <YStack space="$2">
                                {searchResults.map((result) => (
                                    <XStack
                                        key={result.id}
                                        p="$3"
                                        br="$2"
                                        bg="$gray2"
                                        pressStyle={{ bg: '$gray3' }}
                                        onPress={() => handleSearchResultClick(result.title)}
                                    >
                                        <YStack f={1}>
                                            <Text fontWeight="bold">{result.title}</Text>
                                            {result.description && (
                                                <Text color="$gray11" fontSize="$3">
                                                    {result.description}
                                                </Text>
                                            )}
                                        </YStack>
                                    </XStack>
                                ))}
                            </YStack>
                        </ScrollView>
                    ) : (
                        <YStack f={1}>
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
                            <InputContainer>
                                <Input
                                    ref={inputRef}
                                    f={1}
                                    size="$4"
                                    value={inputValue}
                                    onChangeText={handleInputChange}
                                    placeholder="Napisz wiadomość..."
                                    onFocus={handleInputFocus}
                                    onKeyPress={handleKeyPress}
                                    borderWidth={0}
                                    bg="transparent"
                                    color="white"
                                    returnKeyType="send"
                                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                />
                                <Button
                                    size="$3"
                                    chromeless
                                    icon={<Send size="$1" color="white" />}
                                    onPress={sendMessage}
                                    disabled={!inputValue.trim()}
                                />
                            </InputContainer>
                        </YStack>
                    )}
                </YStack>
            )}
        </YStack>
    );

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 60,
                left: 0,
                right: 0,
                zIndex: 1000
            }}>
                <ChatContent />
            </div>
            {/* Spacer to prevent content overlap */}
            <YStack height={isExpanded ? "calc(60vh + 60px)" : 110} />
        </>
    );
};

export const ChatSupport: React.FC = () => {
    return (
        <ClientOnly>
            <ChatSupportContent />
        </ClientOnly>
    );
};
