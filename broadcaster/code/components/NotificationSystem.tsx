import React, { useEffect, useRef, useState } from 'react';
import { YStack, XStack, Text, Button, ScrollView, Progress } from 'tamagui';
import { X, Check, AlertTriangle, Info } from '@tamagui/lucide-icons';
import { NotificationPanel, NotificationSystemProps, Notification } from './StyledComponents';
import { ClientOnly } from './ClientOnly';
import notificationsData from '../../data/notifications.json';

type NotificationType = 'success' | 'warning' | 'info';

const isValidNotificationType = (type: string): type is NotificationType => {
    return ['success', 'warning', 'info'].includes(type);
};

const AUTO_CLOSE_DELAY = 5000;

const NotificationSystemContent: React.FC<NotificationSystemProps> = ({ 
    isOpen, 
    setIsOpen 
}): JSX.Element => {
    const scrollViewRef = useRef<any>(null);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return <Check size="$1" color="$green10" />;
            case 'warning':
                return <AlertTriangle size="$1" color="$yellow10" />;
            case 'info':
                return <Info size="$1" color="$blue10" />;
        }
    };

    const notifications = notificationsData.notifications.filter(
        (notification): notification is Notification => {
            return isValidNotificationType(notification.type);
        }
    );

    const startCloseTimer = () => {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        setProgress(0);
        const startTime = Date.now();

        progressIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = (elapsed / AUTO_CLOSE_DELAY) * 100;
            if (newProgress >= 100) {
                clearInterval(progressIntervalRef.current!);
            } else {
                setProgress(newProgress);
            }
        }, 100);

        closeTimerRef.current = setTimeout(() => {
            setIsOpen(false);
        }, AUTO_CLOSE_DELAY);
    };

    const handleScroll = () => {
        setLastScrollTime(Date.now());
        startCloseTimer();
    };

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    return (
        <NotificationPanel open={isOpen} animation="quick">
            {/* Header */}
            <YStack zi={1001} bg="$background">
                <XStack p="$4" borderBottomWidth={1} borderBottomColor="$gray5" ai="center" jc="space-between">
                    <Text fontWeight="bold" fontSize="$6">Powiadomienia</Text>
                    <Button 
                        size="$3" 
                        onPress={() => setIsOpen(false)}
                        icon={<X size="$1" />}
                    />
                </XStack>
                {lastScrollTime > 0 && (
                    <Progress value={progress} max={100}>
                        <Progress.Indicator animation="quick" />
                    </Progress>
                )}
            </YStack>

            {/* Notifications List */}
            <ScrollView 
                f={1}
                ref={scrollViewRef}
                showsVerticalScrollIndicator={true}
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                <YStack separator={<YStack h={1} bg="$gray5" />}>
                    {notifications.map((notification) => (
                        <XStack
                            key={notification.id}
                            p="$4"
                            bg="$background"
                            hoverStyle={{ bg: '$gray2' }}
                            pressStyle={{ bg: '$gray3' }}
                            animation="quick"
                        >
                            <XStack space="$3" f={1}>
                                <YStack mt="$1">
                                    {getIcon(notification.type)}
                                </YStack>
                                <YStack f={1} space="$1">
                                    <Text fontWeight="bold">{notification.title}</Text>
                                    <Text color="$gray11" fontSize="$3">
                                        {notification.message}
                                    </Text>
                                    <Text color="$gray9" fontSize="$2">
                                        {notification.time}
                                    </Text>
                                </YStack>
                            </XStack>
                        </XStack>
                    ))}
                </YStack>
            </ScrollView>

            {/* Footer */}
            <XStack p="$4" borderTopWidth={1} borderTopColor="$gray5" jc="center" zi={1001} bg="$background">
                <Button 
                    variant="outlined" 
                    size="$3"
                    onPress={() => {
                        console.log('Mark all as read');
                        setIsOpen(false);
                    }}
                >
                    Oznacz wszystkie jako przeczytane
                </Button>
            </XStack>
        </NotificationPanel>
    );
};

export const NotificationSystem: React.FC<NotificationSystemProps> = (props) => {
    return (
        <ClientOnly>
            <NotificationSystemContent {...props} />
        </ClientOnly>
    );
};
