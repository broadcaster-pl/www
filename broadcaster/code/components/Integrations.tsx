import React from 'react';
import { YStack, XStack, Text, Card, Button, Switch } from 'tamagui';
import { SectionTitle, CardTitle, CardDescription, Integration, IntegrationSetting } from './StyledComponents';
import integrationsData from '../../data/integrations.json';

type IntegrationStatus = 'connected' | 'available';

const isValidStatus = (status: string): status is IntegrationStatus => {
    return ['connected', 'available'].includes(status);
};

export const Integrations: React.FC = (): JSX.Element => {
    const getStatusStyle = (status: IntegrationStatus) => {
        return {
            backgroundColor: status === 'connected' ? '$green2' : '$gray2',
            color: status === 'connected' ? '$green10' : '$gray10'
        };
    };

    const validIntegrations = integrationsData.availableIntegrations.filter(
        (integration): integration is Integration => {
            return isValidStatus(integration.status);
        }
    );

    return (
        <YStack f={1} pt="$8">
            <YStack p="$4" space="$4">
                <SectionTitle>Integracje</SectionTitle>

                {/* Available Integrations */}
                <YStack space="$4">
                    {validIntegrations.map((integration) => (
                        <Card key={integration.name} elevate size="$4" p="$4">
                            <XStack jc="space-between" ai="center">
                                <XStack space="$3" ai="center">
                                    <Text fontSize="$6">{integration.icon}</Text>
                                    <YStack>
                                        <CardTitle>{integration.name}</CardTitle>
                                        <CardDescription>{integration.description}</CardDescription>
                                    </YStack>
                                </XStack>
                                <XStack space="$2" ai="center">
                                    <YStack
                                        px="$2"
                                        py="$1"
                                        br="$2"
                                        {...getStatusStyle(integration.status)}
                                    >
                                        <Text fontSize="$2">
                                            {integration.status === 'connected' ? 'Połączono' : 'Dostępne'}
                                        </Text>
                                    </YStack>
                                    <Button
                                        variant={integration.status === 'connected' ? 'outlined' : undefined}
                                        theme={integration.status === 'connected' ? undefined : 'yellow'}
                                    >
                                        {integration.status === 'connected' ? 'Zarządzaj' : 'Połącz'}
                                    </Button>
                                </XStack>
                            </XStack>
                        </Card>
                    ))}
                </YStack>

                {/* Integration Settings */}
                <Card elevate size="$4" p="$4">
                    <YStack space="$4">
                        <CardTitle>Ustawienia integracji</CardTitle>
                        <YStack space="$4">
                            {integrationsData.settings.map((setting: IntegrationSetting) => (
                                <XStack key={setting.name} jc="space-between" ai="center">
                                    <YStack f={1} mr="$4">
                                        <Text fontWeight="bold">{setting.name}</Text>
                                        <Text color="$gray10" fontSize="$3">
                                            {setting.description}
                                        </Text>
                                    </YStack>
                                    <Switch
                                        size="$4"
                                        defaultChecked={setting.enabled}
                                        onCheckedChange={(checked) => {
                                            console.log(`${setting.name} changed to: ${checked}`);
                                        }}
                                    >
                                        <Switch.Thumb animation="quick" />
                                    </Switch>
                                </XStack>
                            ))}
                        </YStack>
                    </YStack>
                </Card>

                {/* Additional Info */}
                <Card elevate size="$4" p="$4">
                    <YStack space="$2" ai="center">
                        <CardTitle>Potrzebujesz więcej integracji?</CardTitle>
                        <CardDescription ta="center">
                            Skontaktuj się z nami, aby omówić możliwość dodania nowych integracji
                            dostosowanych do Twoich potrzeb.
                        </CardDescription>
                        <Button 
                            theme="yellow" 
                            size="$4" 
                            mt="$2"
                            onPress={() => console.log('Contact support')}
                        >
                            Skontaktuj się z nami
                        </Button>
                    </YStack>
                </Card>
            </YStack>
        </YStack>
    );
};
