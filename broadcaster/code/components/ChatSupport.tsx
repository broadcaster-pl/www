import React, { useEffect, useRef, useState } from 'react';
import { YStack, XStack, Text, Button, Input, ScrollView, GetRef, Stack } from 'tamagui';
import { X, Send, Search, MessageCircle } from '@tamagui/lucide-icons';
import { ChatContainer, ChatPanel, ChatMessage } from './StyledComponents';
import { ClientOnly } from './ClientOnly';
import { searchService } from '../services/SearchService';

const MINIMIZE_DELAY = 15000; // 15 seconds

const ChatSupportContent: React.FC = (): JSX.Element => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const inputRef = useRef<GetRef<typeof Input>>(null);
    const scrollViewRef = useRef<GetRef<typeof ScrollView>>(null);
    const minimizeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const chatContainerRef = useRef<GetRef<typeof YStack>>(null);
    const [isDocked, setIsDocked] = useState(false);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollViewRef.current) {
                const scrollView = scrollViewRef.current as any;
                scrollView.scrollToEnd?.({ animated: true });
            }
        }, 100); // Small delay to ensure content is rendered
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

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    // Scroll to bottom when chat expands
    useEffect(() => {
        if (isExpanded && messages.length > 0) {
            scrollToBottom();
        }
    }, [isExpanded]);

    const resetMinimizeTimer = () => {
        if (minimizeTimerRef.current) {
            clearTimeout(minimizeTimerRef.current);
        }
        if (inputValue.length === 0) {
            minimizeTimerRef.current = setTimeout(() => {
                setIsExpanded(false);
                setIsDocked(true);
            }, MINIMIZE_DELAY);
        }
    };

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            setTimeout(() => {
                setIsDocked(true);
                setIsExpanded(false);
            }, MINIMIZE_DELAY);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey && document.activeElement !== inputRef.current) {
                inputRef.current?.focus();
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

    const handleInputFocus = () => {
        setIsExpanded(true);
        setIsDocked(false);
        resetMinimizeTimer();
        if (messages.length > 0) {
            scrollToBottom();
        }
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (value.length > 0) {
            setIsExpanded(true);
            setIsDocked(false);
        }
        resetMinimizeTimer();
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
            resetMinimizeTimer();
            
            // Focus back on input after sending
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);

            // Simulate response
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
                // Ensure input stays focused after response
                inputRef.current?.focus();
            }, 1000);
        }
    };

    return (
        <YStack
            ref={chatContainerRef}
            animation="quick"
            position="absolute"
            {...(isDocked ? {
                top: 0,
                left: "50%",
                transform: [{ translateX: '-50%' }]
            } : {
                top: "50%",
                left: "50%",
                transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
            })}
            width={isExpanded ? 600 : 400}
            height={isExpanded ? 500 : 50}
            scale={isExpanded ? 1 : 0.8}
            zIndex={1000}
        >
            {!isExpanded ? (
                <XStack
                    p="$2"
                    ai="center"
                    jc="space-between"
                    bg="$background"
                    br="$4"
                    shadowColor="$shadowColor"
                    shadowRadius={20}
                    shadowOffset={{ width: 0, height: 10 }}
                    shadowOpacity={0.2}
                >
                    <Input
                        ref={inputRef}
                        f={1}
                        size="$4"
                        value={inputValue}
                        onChangeText={handleInputChange}
                        placeholder="Szukaj lub rozpocznij czat..."
                        onFocus={handleInputFocus}
                        borderWidth={0}
                        bg="transparent"
                        color="$color"
                        onSubmitEditing={sendMessage}
                        returnKeyType="send"
                    />
                    <Button
                        size="$3"
                        chromeless
                        icon={<Search size="$1" />}
                        onPress={handleInputFocus}
                    />
                </XStack>
            ) : (
                <YStack f={1} bg="$background" br="$4" ov="hidden">
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
                                        onPress={() => setInputValue(result.title)}
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
                            <XStack
                                p="$2"
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
                                    placeholder="Napisz wiadomość..."
                                    onFocus={handleInputFocus}
                                    borderWidth={0}
                                    bg="transparent"
                                    color="white"
                                    onSubmitEditing={sendMessage}
                                    returnKeyType="send"
                                />
                                <Button
                                    size="$3"
                                    chromeless
                                    icon={<Send size="$1" color="white" />}
                                    onPress={sendMessage}
                                    disabled={!inputValue.trim()}
                                />
                            </XStack>
                        </YStack>
                    )}
                </YStack>
            )}
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
