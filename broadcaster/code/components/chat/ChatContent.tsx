import React from 'react';
import { YStack } from 'tamagui';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { ChatSearchResults } from './ChatSearchResults';
import { ChatMessage, SearchResult } from './types';

interface ChatContentProps {
    isExpanded: boolean;
    inputRef: any;
    scrollViewRef: any;
    inputValue: string;
    messages: ChatMessage[];
    searchResults: SearchResult[];
    onInputChange: (value: string) => void;
    onInputFocus: (e?: any) => void;
    onKeyPress: (e: any) => void;
    onSend: () => void;
    onSearchResultClick: (title: string) => void;
}

export const ChatContent: React.FC<ChatContentProps> = ({
    isExpanded,
    inputRef,
    scrollViewRef,
    inputValue,
    messages,
    searchResults,
    onInputChange,
    onInputFocus,
    onKeyPress,
    onSend,
    onSearchResultClick
}) => {
    if (!isExpanded) {
        return (
            <ChatInput
                inputRef={inputRef}
                value={inputValue}
                onChangeText={onInputChange}
                onFocus={onInputFocus}
                onKeyPress={onKeyPress}
                onSend={onSend}
                placeholder="Szukaj lub rozpocznij czat..."
                isMinimized={true}
            />
        );
    }

    return (
        <YStack f={1} bg="$background" ov="hidden" br="$4">
            {searchResults.length > 0 && inputValue && !messages.length ? (
                <ChatSearchResults
                    results={searchResults}
                    onResultClick={onSearchResultClick}
                />
            ) : (
                <YStack f={1}>
                    <ChatMessages
                        messages={messages}
                        scrollViewRef={scrollViewRef}
                    />
                    <ChatInput
                        inputRef={inputRef}
                        value={inputValue}
                        onChangeText={onInputChange}
                        onFocus={onInputFocus}
                        onKeyPress={onKeyPress}
                        onSend={onSend}
                        placeholder="Napisz wiadomość..."
                    />
                </YStack>
            )}
        </YStack>
    );
};
