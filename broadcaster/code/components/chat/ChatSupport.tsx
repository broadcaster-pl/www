import React, { useRef, useState } from 'react';
import { YStack, GetRef, Input, ScrollView } from 'tamagui';
import { ClientOnly } from '../ClientOnly';
import { searchService } from '../../services/SearchService';
import { ChatContent } from './ChatContent';
import { ChatMessage } from './types';
import { useChatFocus, useChatScroll, useClickOutside } from './hooks';

const ChatSupportContent: React.FC = (): JSX.Element => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const inputRef = useRef<GetRef<typeof Input>>(null);
    const scrollViewRef = useRef<GetRef<typeof ScrollView>>(null);
    const chatContainerRef = useRef<GetRef<typeof YStack>>(null);

    const { focusInput } = useChatFocus(inputRef);
    const { scrollToBottom } = useChatScroll(scrollViewRef);

    useClickOutside(chatContainerRef, () => {
        setIsExpanded(false);
    });

    React.useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            setIsExpanded(false);
        }
    }, [isInitialLoad]);

    React.useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    React.useEffect(() => {
        if (isExpanded && messages.length > 0) {
            scrollToBottom();
        }
        if (isExpanded) {
            focusInput();
        }
    }, [isExpanded]);

    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey && document.activeElement !== inputRef.current) {
                e.preventDefault();
                focusInput();
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    React.useEffect(() => {
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

    return (
        <>
            <div style={{
                position: 'fixed',
                top: 60,
                left: 0,
                right: 0,
                zIndex: 1000
            }}>
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
                    <ChatContent
                        isExpanded={isExpanded}
                        inputRef={inputRef}
                        scrollViewRef={scrollViewRef}
                        inputValue={inputValue}
                        messages={messages}
                        searchResults={searchResults}
                        onInputChange={handleInputChange}
                        onInputFocus={handleInputFocus}
                        onKeyPress={handleKeyPress}
                        onSend={sendMessage}
                        onSearchResultClick={handleSearchResultClick}
                    />
                </YStack>
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
