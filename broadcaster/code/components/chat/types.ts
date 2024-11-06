export interface ChatMessage {
    id: number;
    type: 'user' | 'agent';
    content: string;
    time: string;
}

export interface SearchResult {
    id: number;
    title: string;
    description?: string;
}
