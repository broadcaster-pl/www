import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { SectionTitle, CardTitle, CardDescription, BlogPost } from './StyledComponents';
import contentData from '../../data/content.json';

export const Blog: React.FC = (): JSX.Element => {
    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Blog</SectionTitle>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {(contentData.blog.posts as BlogPost[]).map((post, index) => (
                        <Card 
                            key={index} 
                            elevate 
                            size="$4" 
                            p="$4" 
                            w={350}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <YStack space="$2">
                                <XStack jc="space-between" ai="center">
                                    <Text color="$color10">{post.readTime}</Text>
                                    <Text color="$gray10">{post.date}</Text>
                                </XStack>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>{post.excerpt}</CardDescription>
                                <Text fontSize="$3" color="$gray10">
                                    Autor: {post.author}
                                </Text>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </YStack>

            {/* Newsletter Signup */}
            <YStack ai="center" p="$4" space="$4">
                <Card elevate size="$4" p="$4" w={600}>
                    <YStack ai="center" space="$2">
                        <CardTitle>Bądź na bieżąco</CardTitle>
                        <CardDescription>
                            Zapisz się do newslettera, aby otrzymywać najnowsze artykuły i porady.
                        </CardDescription>
                        <XStack space="$2" w="100%" p="$2">
                            <input 
                                type="email" 
                                placeholder="Twój adres email"
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                            <button
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    backgroundColor: 'var(--color10)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Zapisz się
                            </button>
                        </XStack>
                    </YStack>
                </Card>
            </YStack>

            {/* Categories */}
            <YStack ai="center" p="$4" space="$4">
                <Card elevate size="$4" p="$4" w={600}>
                    <YStack space="$2">
                        <CardTitle>Kategorie</CardTitle>
                        <XStack flexWrap="wrap" gap="$2">
                            {['Streaming', 'Poradniki', 'Technologia', 'Nowości', 'Case Studies'].map((category, index) => (
                                <Text
                                    key={index}
                                    bg="$gray5"
                                    px="$2"
                                    py="$1"
                                    br="$2"
                                    color="$gray11"
                                    pressStyle={{ opacity: 0.8 }}
                                    cursor="pointer"
                                >
                                    {category}
                                </Text>
                            ))}
                        </XStack>
                    </YStack>
                </Card>
            </YStack>
        </YStack>
    );
};
