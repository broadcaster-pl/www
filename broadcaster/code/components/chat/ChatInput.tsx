import React from 'react';
import { XStack, Input, Button, GetRef } from 'tamagui';
import { Send, Search } from '@tamagui/lucide-icons';

interface ChatInputProps {
    inputRef: React.RefObject<GetRef<typeof Input>>;
    value: string;
    onChangeText: (value: string) => void;
    onFocus: (e?: any) => void;
    onKeyPress: (e: any) => void;
    onSend: () => void;
    placeholder: string;
    isMinimized?: boolean;
}

export const InputContainer = ({ children, onPress }: { children: React.ReactNode; onPress: (e: any) => void }) => (
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
        onPress={onPress}
    >
        {children}
    </XStack>
);

export const ChatInput: React.FC<ChatInputProps> = ({
    inputRef,
    value,
    onChangeText,
    onFocus,
    onKeyPress,
    onSend,
    placeholder,
    isMinimized = false
}) => {
    return (
        <InputContainer onPress={(e) => {
            e.preventDefault();
            onFocus();
        }}>
            <Input
                ref={inputRef}
                f={1}
                size="$4"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                onFocus={onFocus}
                onKeyPress={onKeyPress}
                borderWidth={0}
                bg="transparent"
                color="white"
                returnKeyType="send"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
            <Button
                size="$3"
                chromeless
                icon={isMinimized ? <Search size="$1" color="white" /> : <Send size="$1" color="white" />}
                onPress={isMinimized ? onFocus : onSend}
                disabled={!isMinimized && !value.trim()}
            />
        </InputContainer>
    );
};
