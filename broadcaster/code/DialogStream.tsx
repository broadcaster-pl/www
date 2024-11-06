import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, Cloud, Video, Share2 } from 'lucide-react';

export function DialogStream() {
    const features = [
        { icon: <Video className="w-6 h-6 mb-2" />, title: "Streaming", desc: "Streaming w czasie rzeczywistym z wielu źródeł" },
        { icon: <Cloud className="w-6 h-6 mb-2" />, title: "Cloud Processing", desc: "Przetwarzanie w chmurze bez obciążania urządzenia" },
        { icon: <Share2 className="w-6 h-6 mb-2" />, title: "Multi-Platform", desc: "Integracja z popularnymi platformami social media" }
    ];

    const pricingPlans = [
        {
            name: "Basic Pack",
            price: "79",
            features: [
                "Unlimited projekty",
                "Wszystkie funkcje",
                "20GB storage",
                "Support 24/7",
                "Export 4K",
                "3 streamy"
            ]
        },
        {
            name: "Pro Pack",
            price: "149",
            features: [
                "Unlimited projekty",
                "100GB storage",
                "Priority support",
                "10 streamów",
                "Własne szablony",
                "Priority processing"
            ]
        },
        {
            name: "Business",
            price: "299",
            features: [
                "Unlimited projekty",
                "500GB storage",
                "Dedykowany opiekun",
                "API access",
                "White label",
                "Custom integracje"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <header className="container mx-auto px-4 py-16 text-center">
                <Badge className="mb-4">Nowość</Badge>
                <h1 className="text-5xl font-bold mb-6">DialogStream</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Profesjonalna platforma do streamingu i przetwarzania mediów
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        Rozpocznij za 1 PLN
                    </Button>
                    <Button size="lg" variant="outline">
                        Zobacz demo
                    </Button>
                </div>
            </header>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Główne funkcje</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="flex justify-center">{feature.icon}</div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription>{feature.desc}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section className="container mx-auto px-4 py-16 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-12">Cennik</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <Card key={index} className={`${index === 1 ? 'border-blue-500 border-2' : ''}`}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <div className="text-3xl font-bold mt-2">{plan.price} PLN<span className="text-sm font-normal">/mies</span></div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center">
                                            <Check className="w-5 h-5 text-green-500 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full mt-6">Wybierz plan</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Rozpocznij już dziś</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Testuj przez 7 dni za 1 PLN z pełnym dostępem do wszystkich funkcji
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Rozpocznij teraz
                </Button>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-600">
                        &copy; 2024 DialogStream. Wszelkie prawa zastrzeżone.
                    </div>
                </div>
            </footer>
        </div>
    );
};


