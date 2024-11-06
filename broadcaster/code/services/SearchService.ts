import { debounce } from '../utils/debounce';

interface SearchResult {
    id: string;
    type: 'chat' | 'stream' | 'user' | 'help';
    title: string;
    description?: string;
    icon?: string;
}

const mockData: SearchResult[] = [
    { id: '1', type: 'stream', title: 'Weekly Q&A', description: 'Live streaming session with community' },
    { id: '2', type: 'chat', title: 'Konfiguracja streamu', description: 'Pomoc techniczna' },
    { id: '3', type: 'help', title: 'Jak rozpocząć streaming?', description: 'Poradnik dla początkujących' },
    { id: '4', type: 'user', title: 'StreamMaster', description: 'Popularny streamer' },
    // Add more mock data as needed
];

class SearchService {
    private static instance: SearchService;
    
    private constructor() {}

    static getInstance(): SearchService {
        if (!SearchService.instance) {
            SearchService.instance = new SearchService();
        }
        return SearchService.instance;
    }

    search = debounce(async (query: string): Promise<SearchResult[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!query) return [];

        const normalizedQuery = query.toLowerCase();
        return mockData.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.description?.toLowerCase().includes(normalizedQuery)
        );
    }, 150); // Debounce time in ms
}

export const searchService = SearchService.getInstance();
