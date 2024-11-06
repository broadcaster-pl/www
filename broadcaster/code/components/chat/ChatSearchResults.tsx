import React from 'react';
import { XStack, YStack, Text, ScrollView } from 'tamagui';
import { SearchResult } from './types';

interface ChatSearchResultsProps {
    results: SearchResult[];
    onResultClick: (title: string) => void;
}

export const ChatSearchResults: React.FC<ChatSearchResultsProps> = ({
    results,
    onResultClick
}) => {
    return (
        <ScrollView f={1} p="$4">
            <YStack space="$2">
                {results.map((result) => (
                    <XStack
                        key={result.id}
                        p="$3"
                        br="$2"
                        bg="$gray2"
                        pressStyle={{ bg: '$gray3' }}
                        onPress={() => onResultClick(result.title)}
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
    );
};
