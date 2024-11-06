import React, { useState } from 'react';
import { YStack, XStack, Text, Card, Button } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
import { SectionTitle, CardTitle, CardDescription, PricingPlan } from './StyledComponents';
import contentData from '../../data/content.json';

export const PaymentSystem: React.FC = (): JSX.Element => {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const paymentMethods = [
        { id: 'card', name: 'Karta płatnicza' },
        { id: 'blik', name: 'BLIK' },
        { id: 'transfer', name: 'Przelew bankowy' }
    ];

    const calculateVAT = (price: string) => {
        const basePrice = parseFloat(price);
        return (basePrice * 0.23).toFixed(2);
    };

    const calculateTotal = (price: string) => {
        const basePrice = parseFloat(price);
        const vat = basePrice * 0.23;
        return (basePrice + vat).toFixed(2);
    };

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Płatność</SectionTitle>
                <YStack maw={600} space="$4" f={1}>
                    {/* Plan Selection */}
                    <Card elevate size="$4" p="$4">
                        <YStack space="$4">
                            <CardTitle>Wybierz plan</CardTitle>
                            <YStack space="$2">
                                {(contentData.pricing.plans as PricingPlan[]).map((plan) => (
                                    <XStack
                                        key={plan.name}
                                        p="$4"
                                        br="$4"
                                        borderWidth={1}
                                        borderColor={selectedPlan === plan.name ? '$color10' : '$gray5'}
                                        bg={selectedPlan === plan.name ? '$gray1' : 'transparent'}
                                        pressStyle={{ scale: 0.98 }}
                                        onPress={() => setSelectedPlan(plan.name)}
                                    >
                                        <YStack f={1} space="$1">
                                            <Text color="$color10" fontSize="$3">{plan.highlight}</Text>
                                            <Text fontWeight="bold" fontSize="$5">{plan.name}</Text>
                                            <Text fontSize="$4">{plan.price} PLN / miesiąc</Text>
                                            <YStack space="$2" mt="$2">
                                                {plan.features.slice(0, 4).map((feature, index) => (
                                                    <XStack key={index} space="$2" ai="center">
                                                        <Check size="$1" color="$color10" />
                                                        <Text>{feature}</Text>
                                                    </XStack>
                                                ))}
                                            </YStack>
                                        </YStack>
                                        <YStack
                                            w={20}
                                            h={20}
                                            br={100}
                                            borderWidth={2}
                                            borderColor={selectedPlan === plan.name ? '$color10' : '$gray5'}
                                            bg={selectedPlan === plan.name ? '$color10' : 'transparent'}
                                        />
                                    </XStack>
                                ))}
                            </YStack>
                        </YStack>
                    </Card>

                    {/* Payment Method */}
                    <Card elevate size="$4" p="$4">
                        <YStack space="$4">
                            <CardTitle>Metoda płatności</CardTitle>
                            <YStack space="$2">
                                {paymentMethods.map((method) => (
                                    <XStack
                                        key={method.id}
                                        p="$4"
                                        br="$4"
                                        borderWidth={1}
                                        borderColor={paymentMethod === method.id ? '$color10' : '$gray5'}
                                        bg={paymentMethod === method.id ? '$gray1' : 'transparent'}
                                        pressStyle={{ scale: 0.98 }}
                                        onPress={() => setPaymentMethod(method.id)}
                                    >
                                        <Text fontWeight="bold" f={1}>{method.name}</Text>
                                        <YStack
                                            w={20}
                                            h={20}
                                            br={100}
                                            borderWidth={2}
                                            borderColor={paymentMethod === method.id ? '$color10' : '$gray5'}
                                            bg={paymentMethod === method.id ? '$color10' : 'transparent'}
                                        />
                                    </XStack>
                                ))}
                            </YStack>
                        </YStack>
                    </Card>

                    {/* Summary */}
                    <Card elevate size="$4" p="$4">
                        <YStack space="$4">
                            <CardTitle>Podsumowanie</CardTitle>
                            {selectedPlan && (
                                <YStack space="$2">
                                    <XStack jc="space-between">
                                        <Text>Plan {selectedPlan}</Text>
                                        <Text>
                                            {contentData.pricing.plans.find(p => p.name === selectedPlan)?.price} PLN
                                        </Text>
                                    </XStack>
                                    <XStack jc="space-between">
                                        <Text color="$gray10">VAT (23%)</Text>
                                        <Text color="$gray10">
                                            {calculateVAT(contentData.pricing.plans.find(p => p.name === selectedPlan)?.price || '0')} PLN
                                        </Text>
                                    </XStack>
                                    <YStack borderTopWidth={1} borderColor="$gray5" mt="$2" pt="$2">
                                        <XStack jc="space-between">
                                            <Text fontWeight="bold">Razem</Text>
                                            <Text fontWeight="bold">
                                                {calculateTotal(contentData.pricing.plans.find(p => p.name === selectedPlan)?.price || '0')} PLN
                                            </Text>
                                        </XStack>
                                    </YStack>
                                </YStack>
                            )}
                        </YStack>
                    </Card>

                    <Button
                        theme="yellow"
                        disabled={!selectedPlan}
                        opacity={selectedPlan ? 1 : 0.5}
                        onPress={() => console.log('Processing payment...')}
                    >
                        Zapłać i aktywuj
                    </Button>

                    <Text color="$gray10" ta="center" fontSize="$3">
                        Klikając "Zapłać i aktywuj" akceptujesz regulamin usługi
                    </Text>
                </YStack>
            </YStack>
        </YStack>
    );
};
