import React, { useState } from 'react';
import { YStack, XStack, Text, Card, Button } from 'tamagui';
import { Activity, Users, HardDrive, Wifi } from '@tamagui/lucide-icons';
import { SectionTitle, CardTitle } from './StyledComponents';

interface StreamStats {
    totalViews: string;
    activeStreams: string;
    storageUsed: string;
    bandwidth: string;
}

interface RecentStream {
    id: number;
    title: string;
    viewers: number;
    duration: string;
    date: string;
}

export const ClientPanel: React.FC = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const streamStats: StreamStats = {
        totalViews: "15,234",
        activeStreams: "3",
        storageUsed: "45.3 GB",
        bandwidth: "1.2 TB"
    };

    const recentStreams: RecentStream[] = [
        { id: 1, title: "Weekend Stream", viewers: 234, duration: "2h 15m", date: "2024-03-15" },
        { id: 2, title: "Tutorial Session", viewers: 567, duration: "1h 45m", date: "2024-03-14" },
        { id: 3, title: "Q&A Stream", viewers: 890, duration: "3h 30m", date: "2024-03-13" }
    ];

    const statIcons = {
        totalViews: <Users size="$1" color="$blue10" />,
        activeStreams: <Activity size="$1" color="$green10" />,
        storageUsed: <HardDrive size="$1" color="$yellow10" />,
        bandwidth: <Wifi size="$1" color="$purple10" />
    };

    const tabs = ['dashboard', 'streams', 'analytics', 'settings'];

    return (
        <YStack f={1} pt="$8">
            <YStack p="$4" space="$4">
                <XStack jc="space-between" ai="center">
                    <SectionTitle>Panel klienta</SectionTitle>
                    <Button theme="yellow">Nowy stream</Button>
                </XStack>

                {/* Tabs */}
                <XStack space="$2">
                    {tabs.map((tab) => (
                        <Button
                            key={tab}
                            theme={activeTab === tab ? "yellow" : undefined}
                            variant={activeTab === tab ? undefined : "outlined"}
                            onPress={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Button>
                    ))}
                </XStack>

                {activeTab === 'dashboard' && (
                    <YStack space="$4">
                        {/* Stats Cards */}
                        <XStack flexWrap="wrap" space="$4">
                            {Object.entries(streamStats).map(([key, value]) => (
                                <Card key={key} elevate size="$4" p="$4" w={250}>
                                    <YStack space="$2">
                                        <XStack space="$2" ai="center">
                                            {statIcons[key as keyof typeof statIcons]}
                                            <Text color="$gray10">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </Text>
                                        </XStack>
                                        <Text fontSize="$6" fontWeight="bold">{value}</Text>
                                    </YStack>
                                </Card>
                            ))}
                        </XStack>

                        {/* Recent Streams */}
                        <Card elevate size="$4" p="$4">
                            <YStack space="$4">
                                <CardTitle>Ostatnie streamy</CardTitle>
                                <YStack separator={<YStack h={1} bg="$gray5" />}>
                                    {recentStreams.map((stream) => (
                                        <XStack key={stream.id} py="$4" jc="space-between" ai="center">
                                            <YStack>
                                                <Text fontWeight="bold">{stream.title}</Text>
                                                <Text color="$gray10">{stream.date}</Text>
                                            </YStack>
                                            <XStack space="$4" ai="center">
                                                <Text color="$gray10">
                                                    {stream.viewers} widzów • {stream.duration}
                                                </Text>
                                                <Button variant="outlined" size="$3">
                                                    Szczegóły
                                                </Button>
                                            </XStack>
                                        </XStack>
                                    ))}
                                </YStack>
                            </YStack>
                        </Card>

                        {/* Quick Actions */}
                        <Card elevate size="$4" p="$4">
                            <YStack space="$4">
                                <CardTitle>Szybkie akcje</CardTitle>
                                <XStack flexWrap="wrap" gap="$2">
                                    <Button theme="yellow">Rozpocznij stream</Button>
                                    <Button variant="outlined">Zaplanuj stream</Button>
                                    <Button variant="outlined">Ustawienia streamu</Button>
                                    <Button variant="outlined">Analityka</Button>
                                </XStack>
                            </YStack>
                        </Card>
                    </YStack>
                )}
            </YStack>
        </YStack>
    );
};
