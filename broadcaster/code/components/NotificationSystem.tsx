import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { X, Check, AlertTriangle, Info } from '@tamagui/lucide-icons';
import { NotificationPanel, NotificationSystemProps, Notification } from './StyledComponents';
import notificationsData from '../../data/notifications.json';

type NotificationType = 'success' | 'warning' | 'info';

const isValidNotificationType = (type: string): type is NotificationType => {
    return ['success', 'warning', 'info'].includes(type);
};

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ 
    isOpen, 
    setIsOpen 
}): JSX.Element => {
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

    const getBackgroundColor = (type: NotificationType) => {
        switch (type) {
            case 'success':
                return '$green2';
            case 'warning':
                return '$yellow2';
            case 'info':
                return '$blue2';
        }
    };

    const notifications = notificationsData.notifications.filter(
        (notification): notification is Notification => {
            return isValidNotificationType(notification.type);
        }
    );

    return (
        <NotificationPanel
            opacity={isOpen ? 1 : 0}
            x={isOpen ? 0 : 384}
            animation="quick"
        >
            {/* Header */}
            <XStack p="$4" borderBottomWidth={1} borderBottomColor="$gray5" ai="center" jc="space-between">
                <Text fontWeight="bold" fontSize="$6">Powiadomienia</Text>
                <Button 
                    size="$3" 
                    onPress={() => setIsOpen(false)}
                    icon={<X size="$1" />}
                />
            </XStack>

            {/* Notifications List */}
            <YStack f={1} separator={<YStack h={1} bg="$gray5" />}>
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

            {/* Footer */}
            <XStack p="$4" borderTopWidth={1} borderTopColor="$gray5" jc="center">
                <Button 
                    variant="outlined" 
                    size="$3"
                    onPress={() => console.log('Mark all as read')}
                >
                    Oznacz wszystkie jako przeczytane
                </Button>
            </XStack>
        </NotificationPanel>
    );
};
