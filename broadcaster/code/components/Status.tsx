import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { CheckCircle, AlertCircle } from '@tamagui/lucide-icons';
import { SectionTitle, CardTitle, ServiceStatus } from './StyledComponents';
import contentData from '../../data/content.json';

export const Status: React.FC = (): JSX.Element => {
    const allOperational = (contentData.status.services as ServiceStatus[])
        .every(service => service.status === 'operational');

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Status usług</SectionTitle>
                <Card elevate size="$4" p="$4" w={800}>
                    <YStack space="$4">
                        <XStack jc="space-between" ai="center">
                            <CardTitle>Status systemu</CardTitle>
                            <XStack 
                                bg={allOperational ? '$green2' : '$yellow2'}
                                px="$2" 
                                py="$1" 
                                br="$2"
                                ai="center"
                                space="$1"
                            >
                                {allOperational ? (
                                    <>
                                        <CheckCircle size="$1" color="$green10" />
                                        <Text color="$green10">Wszystkie systemy sprawne</Text>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle size="$1" color="$yellow10" />
                                        <Text color="$yellow10">Częściowe utrudnienia</Text>
                                    </>
                                )}
                            </XStack>
                        </XStack>

                        <YStack space="$4">
                            {(contentData.status.services as ServiceStatus[]).map((service, index) => (
                                <XStack 
                                    key={index} 
                                    jc="space-between" 
                                    ai="center" 
                                    borderBottomWidth={1} 
                                    borderColor="$gray5" 
                                    pb="$2"
                                >
                                    <Text fontWeight="bold">{service.name}</Text>
                                    <XStack space="$4" ai="center">
                                        <Text color="$gray10">Uptime: {service.uptime}</Text>
                                        <XStack 
                                            bg={service.status === 'operational' ? '$green2' : '$yellow2'}
                                            px="$2" 
                                            py="$1" 
                                            br="$2"
                                            ai="center"
                                            space="$1"
                                        >
                                            {service.status === 'operational' ? (
                                                <>
                                                    <CheckCircle size={12} color="$green10" />
                                                    <Text color="$green10">Operational</Text>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle size={12} color="$yellow10" />
                                                    <Text color="$yellow10">Issues</Text>
                                                </>
                                            )}
                                        </XStack>
                                    </XStack>
                                </XStack>
                            ))}
                        </YStack>
                    </YStack>
                </Card>

                {/* Incident History */}
                <Card elevate size="$4" p="$4" w={800}>
                    <YStack space="$4">
                        <CardTitle>Historia incydentów</CardTitle>
                        <YStack space="$2">
                            <Text color="$gray10">
                                Ostatnie 30 dni: 99.99% uptime
                            </Text>
                            <XStack h={100} space="$1">
                                {Array.from({ length: 30 }).map((_, index) => (
                                    <YStack
                                        key={index}
                                        f={1}
                                        bg={index === 29 ? '$yellow2' : '$green2'}
                                        br="$1"
                                    />
                                ))}
                            </XStack>
                            <XStack jc="space-between">
                                <Text color="$gray10">30 dni temu</Text>
                                <Text color="$gray10">Dziś</Text>
                            </XStack>
                        </YStack>
                    </YStack>
                </Card>

                {/* Subscribe to Updates */}
                <Card elevate size="$4" p="$4" w={800}>
                    <YStack ai="center" space="$2">
                        <CardTitle>Powiadomienia o statusie</CardTitle>
                        <Text color="$gray10" ta="center">
                            Otrzymuj powiadomienia email o statusie usług i planowanych pracach serwisowych.
                        </Text>
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
                                Subskrybuj
                            </button>
                        </XStack>
                    </YStack>
                </Card>
            </YStack>
        </YStack>
    );
};
