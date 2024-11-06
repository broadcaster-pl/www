import React, { useState } from 'react';
import { YStack, XStack, Text, Card, Button, Select } from 'tamagui';
import { SectionTitle, CardTitle, AnalyticsData, TopStream } from './StyledComponents';
import analyticsData from '../../data/analytics.json';

interface ChartProps {
    data: AnalyticsData[];
    metric: string;
}

// Simple Chart Component (placeholder for actual chart library)
const Chart: React.FC<ChartProps> = ({ data, metric }) => {
    return (
        <YStack h={320} jc="center" ai="center">
            <Text color="$gray10">
                Chart visualization for {metric} would go here.
                Consider using a chart library like react-native-chart-kit or victory-native.
            </Text>
        </YStack>
    );
};

export const AdvancedAnalytics: React.FC = (): JSX.Element => {
    const [dateRange, setDateRange] = useState('7d');
    const [metric, setMetric] = useState('viewers');

    const getMetricLabel = (metricKey: string) => {
        switch(metricKey) {
            case 'viewers':
                return 'widzów';
            case 'engagement':
                return 'zaangażowania';
            case 'duration':
                return 'czasu oglądania';
            default:
                return metricKey;
        }
    };

    return (
        <YStack f={1} pt="$8">
            <YStack p="$4" space="$4">
                <XStack jc="space-between" ai="center">
                    <SectionTitle>Analityka</SectionTitle>
                    <XStack space="$4">
                        <Select
                            value={dateRange}
                            onValueChange={(value) => setDateRange(value)}
                            size="$4"
                        >
                            <Select.Trigger w={200}>
                                <Select.Value placeholder="Wybierz okres" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.ScrollUpButton />
                                <Select.Viewport>
                                    <Select.Group>
                                        <Select.Label>Okres</Select.Label>
                                        <Select.Item index={0} value="7d">
                                            <Select.ItemText>Ostatnie 7 dni</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item index={1} value="30d">
                                            <Select.ItemText>Ostatnie 30 dni</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item index={2} value="90d">
                                            <Select.ItemText>Ostatnie 90 dni</Select.ItemText>
                                        </Select.Item>
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton />
                            </Select.Content>
                        </Select>

                        <Select
                            value={metric}
                            onValueChange={(value) => setMetric(value)}
                            size="$4"
                        >
                            <Select.Trigger w={200}>
                                <Select.Value placeholder="Wybierz metrykę" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.ScrollUpButton />
                                <Select.Viewport>
                                    <Select.Group>
                                        <Select.Label>Metryka</Select.Label>
                                        <Select.Item index={0} value="viewers">
                                            <Select.ItemText>Widzowie</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item index={1} value="engagement">
                                            <Select.ItemText>Zaangażowanie</Select.ItemText>
                                        </Select.Item>
                                        <Select.Item index={2} value="duration">
                                            <Select.ItemText>Czas oglądania</Select.ItemText>
                                        </Select.Item>
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton />
                            </Select.Content>
                        </Select>
                    </XStack>
                </XStack>

                {/* Chart */}
                <Card elevate size="$4" p="$4">
                    <YStack space="$2">
                        <CardTitle>Trend {getMetricLabel(metric)}</CardTitle>
                        <Chart 
                            data={analyticsData.dailyStats} 
                            metric={metric}
                        />
                    </YStack>
                </Card>

                {/* Detailed Stats */}
                <XStack space="$4">
                    <Card elevate size="$4" p="$4" f={1}>
                        <YStack space="$4">
                            <CardTitle>Szczegółowe metryki</CardTitle>
                            <YStack space="$4">
                                <XStack jc="space-between" ai="center">
                                    <Text>Średnia liczba widzów</Text>
                                    <Text fontWeight="bold">{analyticsData.averages.viewers}</Text>
                                </XStack>
                                <XStack jc="space-between" ai="center">
                                    <Text>Średnie zaangażowanie</Text>
                                    <Text fontWeight="bold">{analyticsData.averages.engagement}%</Text>
                                </XStack>
                                <XStack jc="space-between" ai="center">
                                    <Text>Średni czas oglądania</Text>
                                    <Text fontWeight="bold">{analyticsData.averages.duration} min</Text>
                                </XStack>
                            </YStack>
                        </YStack>
                    </Card>

                    <Card elevate size="$4" p="$4" f={1}>
                        <YStack space="$4">
                            <CardTitle>Top streamy</CardTitle>
                            <YStack space="$4">
                                {analyticsData.topStreams.map((stream: TopStream, index: number) => (
                                    <XStack key={index} jc="space-between" ai="center">
                                        <YStack>
                                            <Text fontWeight="bold">{stream.title}</Text>
                                            <Text color="$gray10">{stream.date}</Text>
                                        </YStack>
                                        <Text fontWeight="bold">{stream.viewers} widzów</Text>
                                    </XStack>
                                ))}
                            </YStack>
                        </YStack>
                    </Card>
                </XStack>
            </YStack>
        </YStack>
    );
};
