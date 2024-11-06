// Dokumentacja API Component
const APIDocumentation = () => {
    const endpoints = [
        {
            method: 'GET',
            endpoint: '/api/v1/streams',
            description: 'Lista aktywnych streamów',
            parameters: [
                { name: 'limit', type: 'number', description: 'Limit wyników (default: 10)' },
                { name: 'offset', type: 'number', description: 'Offset wyników (default: 0)' }
            ],
            example: `
{
  "streams": [
    {
      "id": "stream_123",
      "title": "My Stream",
      "status": "live",
      "viewers": 150,
      "started_at": "2024-03-15T10:00:00Z"
    }
  ],
  "total": 1
}`
        },
        {
            method: 'POST',
            endpoint: '/api/v1/streams/create',
            description: 'Utworzenie nowego streamu',
            parameters: [
                { name: 'title', type: 'string', description: 'Tytuł streamu' },
                { name: 'description', type: 'string', description: 'Opis streamu (opcjonalny)' }
            ],
            example: `
{
  "stream_key": "abc123xyz",
  "rtmp_url": "rtmp://stream.dialogstream.com/live",
  "playback_url": "https://stream.dialogstream.com/watch/abc123xyz"
}`
        }
    ];

    return (
        <div className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-12">Dokumentacja API</h1>
                <div className="max-w-4xl mx-auto">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Uwierzytelnianie</CardTitle>
                            <CardDescription>
                                Wszystkie zapytania do API wymagają tokenu uwierzytelniającego w headerze:
                                <code className="block bg-gray-100 p-2 mt-2 rounded">
                                    Authorization: Bearer YOUR_API_KEY
                                </code>
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {endpoints.map((endpoint, index) => (
                        <Card key={index} className="mb-8">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Badge className={endpoint.method === 'GET' ? 'bg-blue-500' : 'bg-green-500'}>
                                        {endpoint.method}
                                    </Badge>
                                    <code className="text-sm">{endpoint.endpoint}</code>
                                </div>
                                <CardDescription className="mt-2">
                                    {endpoint.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <h4 className="font-medium mb-2">Parametry:</h4>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div className="font-medium">Nazwa</div>
                                        <div className="font-medium">Typ</div>
                                        <div className="font-medium">Opis</div>
                                        {endpoint.parameters.map((param, pIndex) => (
                                            <React.Fragment key={pIndex}>
                                                <div>{param.name}</div>
                                                <div>{param.type}</div>
                                                <div>{param.description}</div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Przykładowa odpowiedź:</h4>
                                    <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                    {endpoint.example}
                  </pre>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Panel klienta Component
const ClientPanel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const streamStats = {
        totalViews: "15,234",
        activeStreams: "3",
        storageUsed: "45.3 GB",
        bandwidth: "1.2 TB"
    };

    const recentStreams = [
        { id: 1, title: "Weekend Stream", viewers: 234, duration: "2h 15m", date: "2024-03-15" },
        { id: 2, title: "Tutorial Session", viewers: 567, duration: "1h 45m", date: "2024-03-14" },
        { id: 3, title: "Q&A Stream", viewers: 890, duration: "3h 30m", date: "2024-03-13" }
    ];

    return (
        <div className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Panel klienta</h1>
                    <Button>Nowy stream</Button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8">
                    {['dashboard', 'streams', 'analytics', 'settings'].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "default" : "outline"}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Button>
                    ))}
                </div>

                {/* Dashboard Content */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {Object.entries(streamStats).map(([key, value]) => (
                                <Card key={key}>
                                    <CardHeader>
                                        <CardTitle className="text-sm text-gray-500">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </CardTitle>
                                        <div className="text-2xl font-bold">{value}</div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Streams */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ostatnie streamy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="divide-y">
                                    {recentStreams.map((stream) => (
                                        <div key={stream.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{stream.title}</div>
                                                <div className="text-sm text-gray-500">{stream.date}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-sm">
                                                    {stream.viewers} widzów • {stream.duration}
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Szczegóły
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

// System płatności Component
const PaymentSystem = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-12">Płatność</h1>
                <div className="max-w-2xl mx-auto">
                    {/* Plan Selection */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Wybierz plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {['Pro', 'Business'].map((plan) => (
                                    <div
                                        key={plan}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`p-4 border rounded-lg cursor-pointer ${
                                            selectedPlan === plan ? 'border-blue-500 bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">{plan}</div>
                                                <div className="text-sm text-gray-500">
                                                    {plan === 'Pro' ? '149 PLN / miesiąc' : '299 PLN / miesiąc'}
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border ${
                                                selectedPlan === plan ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                            }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Metoda płatności</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { id: 'card', name: 'Karta płatnicza' },
                                    { id: 'blik', name: 'BLIK' },
                                    { id: 'transfer', name: 'Przelew bankowy' }
                                ].map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 border rounded-lg cursor-pointer ${
                                            paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="font-medium">{method.name}</div>
                                            <div className={`w-4 h-4 rounded-full border ${
                                                paymentMethod === method.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                            }`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Podsumowanie</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Plan {selectedPlan || '-'}</span>
                                    <span>{selectedPlan === 'Pro' ? '149 PLN' : selectedPlan === 'Business' ? '299 PLN' : '-'}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>VAT (23%)</span>
                                    <span>{selectedPlan === 'Pro' ? '34,27 PLN' : selectedPlan === 'Business' ? '68,77 PLN' : '-'}</span>
                                </div>
                                <div className="pt-2 border-t mt-2">
                                    <div className="flex justify-between font-bold">
                                        <span>Razem</span>
                                        <span>{selectedPlan === 'Pro' ? '183,27 PLN' : selectedPlan === 'Business' ? '367,77 PLN' : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full" disabled={!selectedPlan}>
                        Zapłać i aktywuj
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DialogStream;
