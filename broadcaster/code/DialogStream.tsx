import React from 'react';
import { YStack, XStack, Text, Button, Card, Stack } from 'tamagui';
import { Check, Zap, Shield, Cloud, Video, Share2, Star, Fingerprint, Box, Tv } from '@tamagui/lucide-icons';

export function DialogStream() {
    const features = [
        { icon: Video, title: "Streaming", desc: "Streaming w czasie rzeczywistym z wielu źródeł" },
        { icon: Cloud, title: "Cloud Processing", desc: "Przetwarzanie w chmurze bez obciążania urządzenia" },
        { icon: Share2, title: "Multi-Platform", desc: "Integracja z popularnymi platformami social media" },
        { icon: Star, title: "AI Enhancement", desc: "Automatyczna optymalizacja contentu" },
        { icon: Box, title: "Storage", desc: "Bezpieczne przechowywanie w chmurze" },
        { icon: Tv, title: "Multi-channel", desc: "Zarządzanie wieloma kanałami" }
    ];

    const pricingPlans = [
        {
            name: "Pro",
            price: "149",
            highlight: "Najpopularniejszy wybór",
            features: [
                "Unlimited projekty",
                "100GB storage",
                "Priority support 24/7",
                "10 równoczesnych streamów",
                "Własne szablony",
                "Priority processing",
                "Backup w chmurze",
                "4K streaming"
            ]
        },
        {
            name: "Business",
            price: "299",
            highlight: "Dla profesjonalistów",
            features: [
                "Unlimited projekty",
                "500GB storage",
                "Dedykowany opiekun 24/7",
                "Nielimitowane streamy",
                "API access",
                "White label",
                "Custom integracje",
                "SLA gwarantowane"
            ]
        }
    ];

    const faqItems = [
        {
            question: "Czy mogę zmienić plan w trakcie?",
            answer: "Tak, możesz w dowolnym momencie zmienić plan na wyższy lub niższy. Różnica w cenie zostanie proporcjonalnie rozliczona."
        },
        {
            question: "Jak działa okres testowy?",
            answer: "Otrzymujesz 7 dni pełnego dostępu do wszystkich funkcji Pro za 1 PLN. Możesz anulować w dowolnym momencie."
        }
    ];

    return (
        <YStack f={1} bg="$background">
            {/* Hero Section */}
            <YStack ai="center" p="$4" space="$4">
                <Text color="$color10" fontWeight="bold">Nowość</Text>
                <Text fontSize="$8" fontWeight="bold">DialogStream</Text>
                <Text fontSize="$5" color="$gray10" ta="center">
                    Profesjonalna platforma do streamingu i przetwarzania mediów dla wymagających twórców
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

            {/* Features Grid */}
            <YStack p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold" ta="center">Zaawansowane funkcje</Text>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {features.map((feature, index) => (
                        <Card key={index} elevate size="$4" p="$4" w={300}>
                            <YStack ai="center" space="$2">
                                <feature.icon size="$6" mb="$2" />
                                <Text fontSize="$6" fontWeight="bold">{feature.title}</Text>
                                <Text color="$gray10" ta="center">{feature.desc}</Text>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </YStack>

            {/* Pricing */}
            <YStack bg="$gray1" p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold" ta="center">Profesjonalne plany</Text>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {pricingPlans.map((plan, index) => (
                        <Card 
                            key={index} 
                            elevate 
                            size="$4" 
                            p="$4" 
                            w={400}
                            borderWidth={index === 0 ? 2 : 1}
                            borderColor={index === 0 ? "$color10" : "$gray5"}
                        >
                            <YStack space="$2">
                                <Text color="$color10" fontWeight="bold">{plan.highlight}</Text>
                                <Text fontSize="$6" fontWeight="bold">{plan.name}</Text>
                                <XStack ai="flex-end" space="$1">
                                    <Text fontSize="$8" fontWeight="bold">{plan.price}</Text>
                                    <Text color="$gray10">PLN/mies</Text>
                                </XStack>
                                <YStack space="$2" mt="$4">
                                    {plan.features.map((feature, fIndex) => (
                                        <XStack key={fIndex} space="$2" ai="center">
                                            <Check size="$1" color="$color10" />
                                            <Text>{feature}</Text>
                                        </XStack>
                                    ))}
                                </YStack>
                                <Button mt="$4" theme="yellow">
                                    Wybierz plan
                                </Button>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
                <YStack ai="center" mt="$4">
                    <Text color="$gray10">Potrzebujesz custom rozwiązania?</Text>
                    <Button variant="outlined" mt="$2">Skontaktuj się z nami</Button>
                </YStack>
            </YStack>

            {/* FAQ Section */}
            <YStack p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold" ta="center">Często zadawane pytania</Text>
                <YStack space="$4" maw={800} als="center">
                    {faqItems.map((item, index) => (
                        <Card key={index} elevate size="$4" p="$4">
                            <Text fontSize="$6" fontWeight="bold">{item.question}</Text>
                            <Text color="$gray10" mt="$2">{item.answer}</Text>
                        </Card>
                    ))}
                </YStack>
            </YStack>

            {/* CTA */}
            <YStack ai="center" p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold">Rozpocznij już dziś</Text>
                <Text fontSize="$5" color="$gray10" ta="center">
                    7 dni pełnego dostępu za 1 PLN. Bez zobowiązań.
                </Text>
                <Button size="$5" theme="yellow">
                    Rozpocznij teraz
                </Button>
            </YStack>

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
                            items: ["Funkcje", "Cennik", "FAQ"]
                        },
                        {
                            title: "Wsparcie",
                            items: ["Dokumentacja", "Kontakt", "Status"]
                        },
                        {
                            title: "Firma",
                            items: ["O nas", "Blog", "Kariera"]
                        }
                    ].map((section, index) => (
                        <YStack key={index} space="$2" w={150}>
                            <Text fontWeight="bold">{section.title}</Text>
                            {section.items.map((item, itemIndex) => (
                                <Text key={itemIndex} color="$gray10">{item}</Text>
                            ))}
                        </YStack>
                    ))}
                </XStack>
                <YStack ai="center" mt="$4" pt="$4" borderTopWidth={1} borderColor="$gray5">
                    <Text color="$gray10">&copy; 2024 DialogStream. Wszelkie prawa zastrzeżone.</Text>
                </YStack>
            </YStack>
        </YStack>
    );
};
