import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { Video, Cloud, Share2, Star, Box, Tv } from '@tamagui/lucide-icons';
import { 
    SectionTitle, 
    CardTitle, 
    CardDescription, 
    Feature, 
    Benefit,
    FeaturesProps 
} from './StyledComponents';
import featuresData from '../../data/features.json';

const iconMap = {
    Video,
    Cloud,
    Share2,
    Star,
    Box,
    Tv
};

export const Features: React.FC<FeaturesProps> = ({ setCurrentPage }): JSX.Element => {
    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName as keyof typeof iconMap];
        return IconComponent ? <IconComponent size="$6" /> : null;
    };

    return (
        <YStack f={1} pt="$8">
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Funkcje platformy</SectionTitle>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {(featuresData.mainFeatures as Feature[]).map((feature, index) => (
                        <Card key={index} elevate size="$4" p="$4" w={400}>
                            <YStack space="$2">
                                <XStack space="$2" ai="center">
                                    {getIcon(feature.icon)}
                                    <CardTitle>{feature.title}</CardTitle>
                                </XStack>
                                <CardDescription>{feature.desc}</CardDescription>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </YStack>

            {/* Additional Features Section */}
            <YStack ai="center" p="$4" space="$4">
                <SectionTitle>Dodatkowe możliwości</SectionTitle>
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {(featuresData.previewFeatures as Feature[]).map((feature, index) => (
                        <Card 
                            key={index} 
                            elevate 
                            size="$4" 
                            p="$4" 
                            w={300}
                            pressStyle={{ scale: 0.98 }}
                        >
                            <YStack ai="center" space="$2">
                                {getIcon(feature.icon)}
                                <CardTitle>{feature.title}</CardTitle>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </YStack>

            {/* Benefits Section */}
            <YStack ai="center" p="$4">
                <XStack flexWrap="wrap" jc="center" space="$4">
                    {(featuresData.benefits as Benefit[]).map((benefit, index) => (
                        <XStack key={index} ai="center" space="$2">
                            {getIcon(benefit.icon)}
                            <Text>{benefit.text}</Text>
                        </XStack>
                    ))}
                </XStack>
            </YStack>
        </YStack>
    );
};
