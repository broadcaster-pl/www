import React, { useState } from 'react';
import { YStack, XStack, Text, Button, Sheet, Theme } from 'tamagui';
import { Menu, Bell } from '@tamagui/lucide-icons';
import {
    ApiDocumentation,
    Blog,
    ClientPanel,
    Features,
    PaymentSystem,
    Status,
    NotificationSystem,
    AdvancedAnalytics,
    ChatSupport,
    Integrations,
    NavItem
} from './components';
import navigationData from '../data/navigation.json';

export function DialogStream(): JSX.Element {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const renderPage = (): JSX.Element => {
        switch(currentPage) {
            case 'features':
                return <Features setCurrentPage={setCurrentPage} />;
            case 'client':
                return <ClientPanel />;
            case 'api':
                return <ApiDocumentation />;
            case 'blog':
                return <Blog />;
            case 'status':
                return <Status />;
            case 'payment':
                return <PaymentSystem />;
            case 'analytics':
                return <AdvancedAnalytics />;
            case 'integrations':
                return <Integrations />;
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
                                <Button 
                                    size="$5" 
                                    theme="yellow"
                                    onPress={() => setCurrentPage('payment')}
                                >
                                    Rozpocznij za 1 PLN
                                </Button>
                                <Button 
                                    size="$5" 
                                    variant="outlined"
                                    onPress={() => setCurrentPage('contact')}
                                >
                                    Umów demo
                                </Button>
                            </XStack>
                        </YStack>

                        {/* Features Preview */}
                        <YStack p="$4" space="$4">
                            <Text fontSize="$7" fontWeight="bold" ta="center">Poznaj możliwości</Text>
                            <Button 
                                variant="outlined" 
                                onPress={() => setCurrentPage('features')}
                            >
                                Zobacz wszystkie funkcje
                            </Button>
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
                    {navigationData.navItems.map((item: NavItem) => (
                        <Button
                            key={item.key}
                            onPress={() => setCurrentPage(item.key)}
                            theme={currentPage === item.key ? 'yellow' : undefined}
                        >
                            {item.name}
                        </Button>
                    ))}
                    <Button
                        onPress={() => setIsNotificationsOpen(true)}
                        icon={<Bell size="$1" />}
                    />
                    <Button 
                        theme="yellow"
                        onPress={() => setCurrentPage('payment')}
                    >
                        Rozpocznij
                    </Button>
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
                        {navigationData.navItems.map((item: NavItem) => (
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
                        <Button 
                            theme="yellow"
                            onPress={() => {
                                setCurrentPage('payment');
                                setIsMenuOpen(false);
                            }}
                        >
                            Rozpocznij
                        </Button>
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
                    {navigationData.footerSections.map((section, index) => (
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
                <Button 
                    f={1} 
                    theme="yellow"
                    onPress={() => setCurrentPage('payment')}
                >
                    Rozpocznij za 1 PLN
                </Button>
            </XStack>

            {/* Notifications Panel */}
            <NotificationSystem 
                isOpen={isNotificationsOpen} 
                setIsOpen={setIsNotificationsOpen} 
            />

            {/* Chat Support */}
            {isChatOpen && <ChatSupport />}

            {/* Chat Support Toggle */}
            <Button
                position="absolute"
                bottom="$4"
                right="$4"
                size="$4"
                theme="yellow"
                onPress={() => setIsChatOpen(!isChatOpen)}
            >
                {isChatOpen ? 'Zamknij czat' : 'Wsparcie'}
            </Button>
        </YStack>
    );
};
