interface EmailResponse {
    success: boolean;
    message: string;
    verificationCode?: string;
}

interface PhoneResponse {
    success: boolean;
    message: string;
    ticketId?: string;
}

class ChatService {
    private async sendVerificationEmail(email: string): Promise<EmailResponse> {
        // TODO: Integrate with actual email service
        // For now, simulate email verification
        const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                success: true,
                message: 'Kod weryfikacyjny został wysłany',
                verificationCode
            };
        } catch (error) {
            return {
                success: false,
                message: 'Nie udało się wysłać kodu weryfikacyjnego'
            };
        }
    }

    private async createCallbackRequest(phone: string): Promise<PhoneResponse> {
        // TODO: Integrate with actual phone service
        // For now, simulate callback request
        const ticketId = Math.random().toString(36).substring(2, 10).toUpperCase();

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            return {
                success: true,
                message: 'Zgłoszenie zostało zarejestrowane',
                ticketId
            };
        } catch (error) {
            return {
                success: false,
                message: 'Nie udało się zarejestrować zgłoszenia'
            };
        }
    }

    async processEmail(email: string): Promise<string> {
        const response = await this.sendVerificationEmail(email);
        if (response.success) {
            return `Wysłaliśmy kod weryfikacyjny na adres ${email}. Sprawdź swoją skrzynkę i wprowadź otrzymany kod.`;
        } else {
            return 'Przepraszamy, wystąpił błąd podczas wysyłania kodu weryfikacyjnego. Spróbuj ponownie później.';
        }
    }

    async processPhone(phone: string): Promise<string> {
        const response = await this.createCallbackRequest(phone);
        if (response.success) {
            return `Dziękujemy za podanie numeru telefonu. Nasz konsultant skontaktuje się z Tobą wkrótce. Numer zgłoszenia: ${response.ticketId}`;
        } else {
            return 'Przepraszamy, nie udało się zarejestrować zgłoszenia. Spróbuj ponownie później.';
        }
    }

    async verifyCode(code: string, email: string): Promise<boolean> {
        // TODO: Implement actual code verification
        // For now, simulate verification
        await new Promise(resolve => setTimeout(resolve, 500));
        return code.length === 6;
    }

    getQuickResponses(): string[] {
        return [
            'Jak mogę rozpocząć streaming?',
            'Jakie są wymagania techniczne?',
            'Ile kosztuje usługa?',
            'Jak mogę się zarejestrować?',
            'Potrzebuję pomocy technicznej',
            'Status serwerów',
            'Kontakt z obsługą'
        ];
    }

    async getContextualSuggestions(input: string): Promise<string[]> {
        // TODO: Implement actual contextual suggestions based on user input
        // For now, return static suggestions
        const suggestions = [
            'Podaj swój email, aby się zalogować/zarejestrować',
            'Zostaw numer telefonu do kontaktu',
            'Zobacz cennik usług',
            'Sprawdź status serwerów',
            'Uzyskaj pomoc techniczną'
        ];

        return suggestions.filter(s => 
            s.toLowerCase().includes(input.toLowerCase())
        );
    }
}

export const chatService = new ChatService();
