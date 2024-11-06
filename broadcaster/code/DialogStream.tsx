import React from 'react';
import { YStack, XStack, Text, Button, Card } from 'tamagui';
import { Check, Video, Cloud, Share2 } from '@tamagui/lucide-icons';

export function DialogStream() {
    const features = [
        { 
            icon: Video, 
            title: "Streaming", 
            desc: "Streaming w czasie rzeczywistym z wielu źródeł" 
        },
        { 
            icon: Cloud, 
            title: "Cloud Processing", 
            desc: "Przetwarzanie w chmurze bez obciążania urządzenia" 
        },
        { 
            icon: Share2, 
            title: "Multi-Platform", 
            desc: "Integracja z popularnymi platformami social media" 
        }
    ];

    const pricingPlans = [
        {
            name: "Basic Pack",
            price: "79",
            features: [
                "Unlimited projekty",
                "Wszystkie funkcje",
                "20GB storage",
                "Support 24/7",
                "Export 4K",
                "3 streamy"
            ]
        },
        {
            name: "Pro Pack",
            price: "149",
            features: [
                "Unlimited projekty",
                "100GB storage",
                "Priority support",
                "10 streamów",
                "Własne szablony",
                "Priority processing"
            ]
        },
        {
            name: "Business",
            price: "299",
            features: [
                "Unlimited projekty",
                "500GB storage",
                "Dedykowany opiekun",
                "API access",
                "White label",
                "Custom integracje"
            ]
        }
    ];

    return (
        <YStack f={1} bg="$background">
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
                        Zobacz demo
                    </Button>
                </XStack>
            </YStack>

            {/* Features */}
            <YStack p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold" ta="center">Główne funkcje</Text>
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
                <Text fontSize="$7" fontWeight="bold" ta="center">Cennik</Text>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {pricingPlans.map((plan, index) => (
                        <Card 
                            key={index} 
                            elevate 
                            size="$4" 
                            p="$4" 
                            w={300}
                            borderWidth={index === 1 ? 2 : 1}
                            borderColor={index === 1 ? "$color10" : "$gray5"}
                        >
                            <YStack space="$2">
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
            </YStack>

            {/* CTA */}
            <YStack ai="center" p="$4" space="$4">
                <Text fontSize="$7" fontWeight="bold">Rozpocznij już dziś</Text>
                <Text fontSize="$5" color="$gray10" ta="center">
                    Testuj przez 7 dni za 1 PLN z pełnym dostępem do wszystkich funkcji
                </Text>
                <Button size="$5" theme="yellow">
                    Rozpocznij teraz
                </Button>
            </YStack>

            {/* Footer */}
            <YStack borderTopWidth={1} borderColor="$gray5" mt="$4" p="$4">
                <Text ta="center" color="$gray10">
                    &copy; 2024 DialogStream. Wszelkie prawa zastrzeżone.
                </Text>
            </YStack>
        </YStack>
    );
};
