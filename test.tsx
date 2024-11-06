// System notyfikacji
const NotificationSystem = ({ isOpen, setIsOpen }) => {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Stream rozpoczęty',
            message: 'Twój stream "Weekly Q&A" został pomyślnie uruchomiony',
            time: '2 minuty temu'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Wykorzystanie transferu',
            message: 'Zbliżasz się do limitu transferu (85% wykorzystane)',
            time: '1 godzinę temu'
        },
        {
            id: 3,
            type: 'info',
            title: 'Nowa funkcja',
            message: 'Dostępna nowa integracja z TikTok Live',
            time: '2 godziny temu'
        }
    ];

    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-200 ease-in-out z-50`}>
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Powiadomienia</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="divide-y overflow-y-auto h-full pb-20">
                {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50">
                        <div className="flex gap-3">
                            {notification.type === 'success' && <Check className="w-5 h-5 text-green-500" />}
                            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            {notification.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                            <div>
                                <div className="font-medium">{notification.title}</div>
                                <div className="text-sm text-gray-600">{notification.message}</div>
                                <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Rozbudowane statystyki
const AdvancedAnalytics = () => {
    const [dateRange, setDateRange] = useState('7d');
    const [metric, setMetric] = useState('viewers');

    const analyticsData = [
        { date: '2024-03-10', viewers: 1200, engagement: 78, duration: 125 },
        { date: '2024-03-11', viewers: 1500, engagement: 82, duration: 145 },
        { date: '2024-03-12', viewers: 1350, engagement: 75, duration: 115 },
        { date: '2024-03-13', viewers: 1800, engagement: 85, duration: 160 },
        { date: '2024-03-14', viewers: 1600, engagement: 80, duration: 140 },
        { date: '2024-03-15', viewers: 2000, engagement: 88, duration: 180 },
        { date: '2024-03-16', viewers: 1900, engagement: 86, duration: 170 }
    ];

    return (
        <div className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Analityka</h1>
                    <div className="flex gap-4">
                        <select
                            className="border rounded-md p-2"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="7d">Ostatnie 7 dni</option>
                            <option value="30d">Ostatnie 30 dni</option>
                            <option value="90d">Ostatnie 90 dni</option>
                        </select>
                        <select
                            className="border rounded-md p-2"
                            value={metric}
                            onChange={(e) => setMetric(e.target.value)}
                        >
                            <option value="viewers">Widzowie</option>
                            <option value="engagement">Zaangażowanie</option>
                            <option value="duration">Czas oglądania</option>
                        </select>
                    </div>
                </div>

                {/* Chart */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Trend {metric === 'viewers' ? 'widzów' : metric === 'engagement' ? 'zaangażowania' : 'czasu oglądania'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <LineChart data={analyticsData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={metric} stroke="#2563eb" />
                            </LineChart>
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Szczegółowe metryki</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Średnia liczba widzów</span>
                                    <span className="font-bold">1,621</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Średnie zaangażowanie</span>
                                    <span className="font-bold">82%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Średni czas oglądania</span>
                                    <span className="font-bold">148 min</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top streamy</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { title: "Q&A Session", viewers: 2000, date: "2024-03-15" },
                                    { title: "Tutorial Stream", viewers: 1900, date: "2024-03-16" },
                                    { title: "Special Event", viewers: 1800, date: "2024-03-13" }
                                ].map((stream, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">{stream.title}</div>
                                            <div className="text-sm text-gray-500">{stream.date}</div>
                                        </div>
                                        <div className="font-bold">{stream.viewers} widzów</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// System wsparcia (Chat Support)
const ChatSupport = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'system',
            content: 'Witaj w DialogStream Support. Jak możemy Ci pomóc?',
            time: '10:00'
        },
        {
            id: 2,
            type: 'user',
            content: 'Mam problem z konfiguracją streamu',
            time: '10:01'
        },
        {
            id: 3,
            type: 'agent',
            content: 'Dzień dobry! Z przyjemnością pomogę. Który element konfiguracji sprawia problem?',
            time: '10:02'
        }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                type: 'user',
                content: newMessage,
                time: new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
            }]);
            setNewMessage('');
        }
    };

    return (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl z-50">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">Wsparcie techniczne</h3>
                            <span className="text-sm">Online</span>
                        </div>
                        <Button variant="ghost" className="text-white hover:text-blue-100">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : message.type === 'system'
                                        ? 'bg-gray-100'
                                        : 'bg-gray-200'
                            }`}>
                                <div className="text-sm">{message.content}</div>
                                <div className="text-xs mt-1 opacity-70">{message.time}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Napisz wiadomość..."
                            className="flex-1 p-2 border rounded-md"
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Integracje
const Integrations = () => {
    const availableIntegrations = [
        {
            name: "YouTube Live",
            icon: "🎥",
            status: "connected",
            description: "Streamuj bezpośrednio na YouTube"
        },
        {
            name: "Twitch",
            icon: "📺",
            status: "available",
            description: "Integracja z Twitch"
        },
        {
            name: "TikTok Live",
            icon: "📱",
            status: "available",
            description: "Streamuj na TikTok Live"
        },
        {
            name: "Facebook Live",
            icon: "📡",
            status: "connected",
            description: "Transmisje na Facebook Live"
        }
    ];

    return (
        <div className="min-h-screen pt-16">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold mb-8">Integracje</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    {availableIntegrations.map((integration) => (
                        <Card key={integration.name}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{integration.icon}</div>
                                        <div>
                                            <CardTitle>{integration.name}</CardTitle>
                                            <CardDescription>{integration.description}</CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant={integration.status === 'connected' ? 'secondary' : 'outline'}>
                                        {integration.status === 'connected' ? 'Połączono' : 'Dostępne'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant={integration.status === 'connected' ? 'outline' : 'default'} className="w-full">
                                    {integration.status === 'connected' ? 'Zarządzaj' : 'Połącz'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Integration Settings */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Ustawienia integracji</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">Auto-publikacja</div>
                                    <div className="text-sm text-gray-500">Automatycznie publikuj na połączonych platformach</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">Synchronizacja czatu</div>
                                    <div className="text-sm text-gray-500">Połącz czaty ze wszystkich platform</div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">Powiadomienia</div>
                                    <div className="text-sm text-gray-500">Otrzymuj powiadomienia o aktywności</div>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DialogStream;
