import { styled, YStack, Text, XStack, GetProps } from 'tamagui';

// Styled components
export const CodeBlock = styled(YStack, {
    backgroundColor: '$gray5',
    padding: '$2',
    borderRadius: '$2'
});

export const SectionTitle = styled(Text, {
    fontSize: '$8',
    fontWeight: 'bold',
    textAlign: 'center'
});

export const CardTitle = styled(Text, {
    fontSize: '$6',
    fontWeight: 'bold'
});

export const CardDescription = styled(Text, {
    color: '$gray10'
});

// Notification Panel Components
export const NotificationPanel = styled(YStack, {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 384,
    backgroundColor: '$background',
    borderLeftWidth: 1,
    borderLeftColor: '$gray5',
    zIndex: 1000,
    overflow: 'hidden',
    variants: {
        open: {
            true: {
                opacity: 1,
                transform: 'translateX(0)',
            },
            false: {
                opacity: 0,
                transform: 'translateX(384px)',
            }
        }
    } as const,
    defaultVariants: {
        open: false
    }
});

// Chat Components
export const ChatPanel = styled(YStack, {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 384,
    height: 600,
    backgroundColor: '$background',
    borderRadius: '$4',
    shadowColor: '$shadowColor',
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    overflow: 'hidden'
});

export const ChatHeader = styled(XStack, {
    backgroundColor: '$color10',
    padding: '$4',
    borderTopLeftRadius: '$4',
    borderTopRightRadius: '$4'
});

export const ChatInput = styled(YStack, {
    padding: '$4',
    borderTopWidth: 1,
    borderTopColor: '$gray5'
});

// Common interfaces
export interface NavItem {
    name: string;
    key: string;
}

export interface FooterSection {
    title: string;
    items: Array<{
        name: string;
        key: string;
    }>;
}

export interface Feature {
    icon: string;
    title: string;
    desc?: string;
}

export interface Benefit {
    icon: string;
    text: string;
}

export interface PricingPlan {
    name: string;
    price: string;
    highlight: string;
    features: string[];
}

export interface BlogPost {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
}

export interface ServiceStatus {
    name: string;
    status: string;
    uptime: string;
}

export interface ApiEndpoint {
    method: string;
    endpoint: string;
    description: string;
    parameters: Array<{
        name: string;
        type: string;
        description: string;
    }>;
    example: any;
}

export interface FeaturesProps {
    setCurrentPage: (page: string) => void;
}

export interface Notification {
    id: number;
    type: 'success' | 'warning' | 'info';
    title: string;
    message: string;
    time: string;
}

export interface NotificationSystemProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export interface ChatMessage {
    id: number;
    type: 'system' | 'user' | 'agent';
    content: string;
    time: string;
}

export interface Integration {
    name: string;
    icon: string;
    status: 'connected' | 'available';
    description: string;
}

export interface IntegrationSetting {
    name: string;
    description: string;
    enabled: boolean;
}

export interface AnalyticsData {
    date: string;
    viewers: number;
    engagement: number;
    duration: number;
}

export interface TopStream {
    title: string;
    viewers: number;
    date: string;
}
