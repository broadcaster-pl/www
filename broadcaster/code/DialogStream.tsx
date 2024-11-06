import React, { useState } from 'react';
import { YStack, XStack, Text, Button, Card, Stack, Input, Select, TextArea, Sheet } from 'tamagui';
import { Check, Zap, Shield, Cloud, Video, Share2, Star, Fingerprint, Box, Tv, Menu, X } from '@tamagui/lucide-icons';

// Features Component
const Features = () => (
    <YStack f={1} pt="$8">
        <YStack ai="center" p="$4" space="$4">
            <Text fontSize="$8" fontWeight="bold">Funkcje platformy</Text>
            <XStack flexWrap="wrap" jc="center" space="$4">
                <Card elevate size="$4" p="$4" w={400}>
                    <YStack space="$2">
                        <XStack space="$2" ai="center">
                            <Video size="$2" />
                            <Text fontSize="$6" fontWeight="bold">Streaming w czasie rzeczywistym</Text>
                        </XStack>
                        <YStack space="$2">
                            <Text>• Multi-platform streaming</Text>
                            <Text>• Custom RTMP endpoints</Text>
                            <Text>• Low-latency delivery</Text>
                            <Text>• Adaptywny bitrate</Text>
                            <Text>• Chat integration</Text>
                        </YStack>
                    </YStack>
                </Card>

                <Card elevate size="$4" p="$4" w={400}>
                    <YStack space="$2">
                        <XStack space="$2" ai="center">
                            <Cloud size="$2" />
                            <Text fontSize="$6" fontWeight="bold">Cloud Processing</Text>
                        </XStack>
                        <YStack space="$2">
                            <Text>• Auto-scaling resources</Text>
                            <Text>• Real-time transcoding</Text>
                            <Text>• AI-powered optimization</Text>
                            <Text>• Global CDN</Text>
                            <Text>• Edge computing</Text>
                        </YStack>
                    </YStack>
                </Card>

                <Card elevate size="$4" p="$4" w={400}>
                    <YStack space="$2">
                        <XStack space="$2" ai="center">
                            <Box size="$2" />
                            <Text fontSize="$6" fontWeight="bold">Content Management</Text>
                        </XStack>
                        <YStack space="$2">
                            <Text>• Automated workflows</Text>
                            <Text>• Asset organization</Text>
                            <Text>• Version control</Text>
                            <Text>• Team collaboration</Text>
                            <Text>• Custom metadata</Text>
                        </YStack>
                    </YStack>
                </Card>

                <Card elevate size="$4" p="$4" w={400}>
                    <YStack space="$2">
                        <XStack space="$2" ai="center">
                            <Star size="$2" />
                            <Text fontSize="$6" fontWeight="bold">AI Enhancement</Text>
                        </XStack>
                        <YStack space="$2">
                            <Text>• Auto-highlights</Text>
                            <Text>• Content moderation</Text>
                            <Text>• Speech-to-text</Text>
                            <Text>• Smart thumbnails</Text>
                            <Text>• Audience analytics</Text>
                        </YStack>
                    </YStack>
                </Card>
            </XStack>
        </YStack>
    </YStack>
);

// Contact Component
const Contact = () => (
    <YStack f={1} pt="$8">
        <YStack ai="center" p="$4" space="$4">
            <Text fontSize="$8" fontWeight="bold">Kontakt</Text>
            <Card elevate size="$4" p="$4" w={600}>
                <YStack space="$4">
                    <YStack space="$2">
                        <Text fontWeight="bold">Imię i nazwisko</Text>
                        <Input size="$4" />
                    </YStack>
                    <YStack space="$2">
                        <Text fontWeight="bold">Email</Text>
                        <Input size="$4" />
                    </YStack>
                    <YStack space="$2">
                        <Text fontWeight="bold">Temat</Text>
                        <Select size="$4">
                            <Select.Trigger>
                                <Select.Value placeholder="Wybierz temat" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Item index={0} value="general">
                                    <Select.ItemText>Zapytanie ogólne</Select.ItemText>
                                </Select.Item>
                                <Select.Item index={1} value="support">
                                    <Select.ItemText>Wsparcie techniczne</Select.ItemText>
                                </Select.Item>
                                <Select.Item index={2} value="business">
                                    <Select.ItemText>Współpraca biznesowa</Select.ItemText>
                                </Select.Item>
                            </Select.Content>
                        </Select>
                    </YStack>
                    <YStack space="$2">
                        <Text fontWeight="bold">Wiadomość</Text>
                        <TextArea size="$4" h={120} />
                    </YStack>
                    <Button theme="yellow">Wyślij wiadomość</Button>
                </YStack>
            </Card>
        </YStack>
    </YStack>
);

// FAQ Component
const FAQ = () => {
    const faqs = [
        {
            question: "Jak rozpocząć korzystanie z DialogStream?",
            answer: "Rozpoczęcie jest proste - wystarczy zarejestrować się i wybrać plan za 1 PLN na 7 dni. Otrzymasz pełny dostęp do wszystkich funkcji Pro."
        },
        {
            question: "Czy mogę zmienić plan w trakcie subskrypcji?",
            answer: "Tak, możesz w dowolnym momencie zmienić plan. Różnica w cenie zostanie proporcjonalnie rozliczona."
        },
        {
            question: "Jakie formaty plików są wspierane?",
            answer: "Wspieramy większość popularnych formatów wideo i audio, włączając MP4, AVI, MOV, MKV, MP3, WAV i więcej."
        },
        {
            question: "Czy oferujecie wsparcie techniczne?",
            answer: "Tak, zapewniamy wsparcie techniczne 24/7 dla wszystkich planów. Plan Business otrzymuje dodatkowo dedykowanego opiekuna."
        }
    ];

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <Text fontSize="$8" fontWeight="bold">Często zadawane pytania</Text>
                <YStack space="$4" maw={800}>
                    {faqs.map((faq, index) => (
                        <Card key={index} elevate size="$4" p="$4">
                            <YStack space="$2">
                                <Text fontSize="$6" fontWeight="bold">{faq.question}</Text>
                                <Text color="$gray10">{faq.answer}</Text>
                            </YStack>
                        </Card>
                    ))}
                </YStack>
            </YStack>
        </YStack>
    );
};

// Blog Component
const Blog = () => {
    const posts = [
        {
            title: "Jak zoptymalizować streaming pod SEO?",
            excerpt: "Poznaj najlepsze praktyki optymalizacji contentu streamingowego pod kątem wyszukiwarek.",
            author: "Anna Kowalska",
            date: "2024-03-15",
            readTime: "5 min"
        },
        {
            title: "Trendy w streamingu na rok 2024",
            excerpt: "Analiza najważniejszych trendów w branży streamingowej na nadchodzący rok.",
            author: "Jan Nowak",
            date: "2024-03-10",
            readTime: "8 min"
        },
        {
            title: "Jak zwiększyć zaangażowanie widzów?",
            excerpt: "Praktyczne wskazówki jak budować społeczność wokół swojego contentu.",
            author: "Marta Wiśniewska",
            date: "2024-03-05",
            readTime: "6 min"
        }
    ];

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <Text fontSize="$8" fontWeight="bold">Blog</Text>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {posts.map((post, index) => (
                        <Card key={index} elevate size="$4" p="$4" w={350}>
                            <YStack space="$2">
                                <XStack jc="space-between" ai="center">
                                    <Text color="$color10">{post.readTime}</Text>
                                    <Text color="$gray10">{post.date}</Text>
                                </XStack>
                                <Text fontSize="$6" fontWeight="bold">{post.title}</Text>
                                <Text color="$gray10">{post.excerpt}</Text>
                                <Text fontSize="$3" color="$gray10">Autor: {post.author}</Text>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </YStack>
        </YStack>
    );
};

// Status Component
const Status = () => {
    const services = [
        {
            name: "Streaming API",
            status: "operational",
            uptime: "99.99%"
        },
        {
            name: "Cloud Processing",
            status: "operational",
            uptime: "99.95%"
        },
        {
            name: "CDN",
            status: "operational",
            uptime: "100%"
        },
        {
            name: "Storage",
            status: "operational",
            uptime: "99.99%"
        }
    ];

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <Text fontSize="$8" fontWeight="bold">Status usług</Text>
                <Card elevate size="$4" p="$4" w={800}>
                    <YStack space="$4">
                        <XStack jc="space-between" ai="center">
                            <Text fontSize="$6" fontWeight="bold">Status systemu</Text>
                            <Text color="$green10">Wszystkie systemy sprawne</Text>
                        </XStack>
                        <YStack space="$4">
                            {services.map((service, index) => (
                                <XStack key={index} jc="space-between" ai="center" borderBottomWidth={1} borderColor="$gray5" pb="$2">
                                    <Text fontWeight="bold">{service.name}</Text>
                                    <XStack space="$4" ai="center">
                                        <Text color="$gray10">Uptime: {service.uptime}</Text>
                                        <Text color="$green10">{service.status}</Text>
                                    </XStack>
                                </XStack>
                            ))}
                        </YStack>
                    </YStack>
                </Card>
            </YStack>
        </YStack>
    );
};

// Main DialogStream Component
export function DialogStream() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Strona główna', key: 'home' },
        { name: 'Funkcje', key: 'features' },
        { name: 'Cennik', key: 'pricing' },
        { name: 'FAQ', key: 'faq' },
        { name: 'Blog', key: 'blog' },
        { name: 'Status', key: 'status' },
        { name: 'Kontakt', key: 'contact' }
    ];

    const renderPage = () => {
        switch(currentPage) {
            case 'features':
                return <Features />;
            case 'contact':
                return <Contact />;
            case 'faq':
                return <FAQ />;
            case 'blog':
                return <Blog />;
            case 'status':
                return <Status />;
            default:
                return (
                    <YStack f={1} pt="$8">
                        {/* Hero Section */}
                        <YStack ai="center" p="$4" space="$4">
                            <Text color="$color10" fontWeight="bold">Nowość</Text>
                            <Text fontSize="$8" fontWeight="bold">DialogStream</Text>
                            <Text fontSize="$5" color="$gray10" ta="center">
                                Profesjonalna platforma do streamingu i przetwarzania mediów
                            </Text>
                            <XStack space="$4">
                                <Button size="$5" theme="yellow">
                                    Rozpocznij za 1 PLN
                                </Button>
                                <Button size="$5" variant="outlined">
                                    Umów demo
                                </Button>
                            </XStack>
                        </YStack>

                        {/* Main Benefits */}
                        <YStack ai="center" p="$4">
                            <XStack flexWrap="wrap" jc="center" space="$4">
                                <XStack ai="center" space="$2">
                                    <Fingerprint size="$1" color="$color10" />
                                    <Text>Unlimited projekty</Text>
                                </XStack>
                                <XStack ai="center" space="$2">
                                    <Shield size="$1" color="$color10" />
                                    <Text>Gwarancja jakości</Text>
                                </XStack>
                                <XStack ai="center" space="$2">
                                    <Zap size="$1" color="$color10" />
                                    <Text>Natychmiastowe przetwarzanie</Text>
                                </XStack>
                            </XStack>
                        </YStack>

                        {/* Features Preview */}
                        <YStack p="$4" space="$4">
                            <Text fontSize="$7" fontWeight="bold" ta="center">Poznaj możliwości</Text>
                            <XStack flexWrap="wrap" jc="center" space="$4">
                                {[
                                    { icon: Video, title: "Live Streaming" },
                                    { icon: Cloud, title: "Cloud Processing" },
                                    { icon: Star, title: "AI Enhancement" }
                                ].map((feature, index) => (
                                    <Card
                                        key={index}
                                        elevate
                                        size="$4"
                                        p="$4"
                                        w={300}
                                        pressStyle={{ scale: 0.98 }}
                                        onPress={() => setCurrentPage('features')}
                                    >
                                        <YStack ai="center" space="$2">
                                            <feature.icon size="$6" />
                                            <Text fontSize="$6" fontWeight="bold">{feature.title}</Text>
                                        </YStack>
                                    </Card>
                                ))}
                            </XStack>
                            <YStack ai="center" mt="$4">
                                <Button variant="outlined" onPress={() => setCurrentPage('features')}>
                                    Zobacz wszystkie funkcje
                                </Button>
                            </YStack>
                        </YStack>
                    </YStack>
                );
        }
    };

    return (
        <YStack f={1}>
            {/* Navigation */}
            <XStack
                position="absolute"
                top={0}
                left={0}
                right={0}
                zi={50}
                bg="$background"
                borderBottomWidth={1}
                borderColor="$gray5"
                h="$5"
                ai="center"
                px="$4"
            >
                <Text fontWeight="bold" fontSize="$6">DialogStream</Text>

                {/* Desktop Navigation */}
                <XStack
                    f={1}
                    jc="flex-end"
                    space="$4"
                    $sm={{ display: "flex" }}
                    $xs={{ display: "none" }}
                >
                    {navItems.map(item => (
                        <Button
                            key={item.key}
                            onPress={() => setCurrentPage(item.key)}
                            theme={currentPage === item.key ? 'yellow' : undefined}
                        >
                            {item.name}
                        </Button>
                    ))}
                    <Button theme="yellow">Rozpocznij</Button>
                </XStack>

                {/* Mobile Menu Button */}
                <Button
                    onPress={() => setIsMenuOpen(true)}
                    $sm={{ display: "none" }}
                    $xs={{ display: "flex" }}
                    ml="auto"
                >
                    <Menu size="$1" />
                </Button>
            </XStack>

            {/* Mobile Navigation Sheet */}
            <Sheet
                modal
                open={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                snapPoints={[90]}
                position={0}
                dismissOnSnapToBottom
            >
                <Sheet.Frame>
                    <Sheet.Handle />
                    <YStack p="$4" space="$4">
                        {navItems.map(item => (
                            <Button
                                key={item.key}
                                onPress={() => {
                                    setCurrentPage(item.key);
                                    setIsMenuOpen(false);
                                }}
                                theme={currentPage === item.key ? 'yellow' : undefined}
                            >
                                {item.name}
                            </Button>
                        ))}
                        <Button theme="yellow">Rozpocznij</Button>
                    </YStack>
                </Sheet.Frame>
            </Sheet>

            {/* Main Content */}
            {renderPage()}

            {/* Footer */}
            <YStack borderTopWidth={1} borderColor="$gray5" mt="$4" p="$4">
                <XStack flexWrap="wrap" jc="space-between" maw={1200} als="center" p="$4">
                    <YStack space="$4" w={250}>
                        <Text fontWeight="bold">DialogStream</Text>
                        <Text color="$gray10">Profesjonalne rozwiązanie dla twórców contentu</Text>
                    </YStack>
                    {[
                        {
                            title: "Produkt",
                            items: [
                                { name: "Funkcje", key: "features" },
                                { name: "Cennik", key: "pricing" },
                                { name: "FAQ", key: "faq" }
                            ]
                        },
                        {
                            title: "Wsparcie",
                            items: [
                                { name: "Dokumentacja", key: "docs" },
                                { name: "Kontakt", key: "contact" },
                                { name: "Status", key: "status" }
                            ]
                        },
                        {
                            title: "Firma",
                            items: [
                                { name: "O nas", key: "about" },
                                { name: "Blog", key: "blog" },
                                { name: "Kariera", key: "careers" }
                            ]
                        }
                    ].map((section, index) => (
                        <YStack key={index} space="$2" w={150}>
                            <Text fontWeight="bold">{section.title}</Text>
                            {section.items.map((item, itemIndex) => (
                                <Text
                                    key={itemIndex}
                                    color="$gray10"
                                    cursor="pointer"
                                    hoverStyle={{ color: '$color10' }}
                                    onPress={() => setCurrentPage(item.key)}
                                >
                                    {item.name}
                                </Text>
                            ))}
                        </YStack>
                    ))}
                </XStack>
                <YStack ai="center" mt="$4" pt="$4" borderTopWidth={1} borderColor="$gray5">
                    <Text color="$gray10">&copy; 2024 DialogStream. Wszelkie prawa zastrzeżone.</Text>
                </YStack>
            </YStack>

            {/* Mobile Bottom CTA */}
            <XStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p="$4"
                bg="$background"
                borderTopWidth={1}
                borderColor="$gray5"
                $sm={{ display: "none" }}
                $xs={{ display: "flex" }}
            >
                <Button f={1} theme="yellow">
                    Rozpocznij za 1 PLN
                </Button>
            </XStack>
        </YStack>
    );
};
