import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { SectionTitle, CodeBlock, CardTitle, ApiEndpoint } from './StyledComponents';
import apiData from '../../data/api.json';

export const ApiDocumentation: React.FC = (): JSX.Element => {
    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Dokumentacja API</SectionTitle>
                <YStack maw={800} space="$4">
                    <Card elevate size="$4" p="$4">
                        <YStack space="$2">
                            <CardTitle>Uwierzytelnianie</CardTitle>
                            <Text color="$gray10">
                                Wszystkie zapytania do API wymagają tokenu uwierzytelniającego w headerze:
                            </Text>
                            <CodeBlock>
                                <Text>Authorization: Bearer YOUR_API_KEY</Text>
                            </CodeBlock>
                        </YStack>
                    </Card>

                    {apiData.endpoints.map((endpoint: ApiEndpoint, index: number) => (
                        <Card key={index} elevate size="$4" p="$4">
                            <YStack space="$4">
                                <XStack space="$2" ai="center">
                                    <Text
                                        bg={endpoint.method === 'GET' ? '$blue10' : '$green10'}
                                        color="white"
                                        px="$2"
                                        py="$1"
                                        br="$2"
                                    >
                                        {endpoint.method}
                                    </Text>
                                    <Text>{endpoint.endpoint}</Text>
                                </XStack>
                                <Text color="$gray10">{endpoint.description}</Text>

                                <YStack space="$2">
                                    <Text fontWeight="bold">Parametry:</Text>
                                    <XStack flexWrap="wrap" space="$4">
                                        <YStack w="30%" space="$2">
                                            <Text fontWeight="bold">Nazwa</Text>
                                            {endpoint.parameters.map((param, pIndex) => (
                                                <Text key={pIndex}>{param.name}</Text>
                                            ))}
                                        </YStack>
                                        <YStack w="20%" space="$2">
                                            <Text fontWeight="bold">Typ</Text>
                                            {endpoint.parameters.map((param, pIndex) => (
                                                <Text key={pIndex}>{param.type}</Text>
                                            ))}
                                        </YStack>
                                        <YStack f={1} space="$2">
                                            <Text fontWeight="bold">Opis</Text>
                                            {endpoint.parameters.map((param, pIndex) => (
                                                <Text key={pIndex}>{param.description}</Text>
                                            ))}
                                        </YStack>
                                    </XStack>
                                </YStack>

                                <YStack space="$2">
                                    <Text fontWeight="bold">Przykładowa odpowiedź:</Text>
                                    <CodeBlock>
                                        <Text whiteSpace="pre">
                                            {JSON.stringify(endpoint.example, null, 2)}
                                        </Text>
                                    </CodeBlock>
                                </YStack>
                            </YStack>
                        </Card>
                    ))}
                </YStack>
            </YStack>
        </YStack>
    );
};
