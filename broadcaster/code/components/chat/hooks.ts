import { useEffect, useRef } from 'react';
import { GetRef, Input, ScrollView } from 'tamagui';

export const useChatFocus = (inputRef: React.RefObject<GetRef<typeof Input>>) => {
    const focusInput = () => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return { focusInput };
};

export const useChatScroll = (scrollViewRef: React.RefObject<GetRef<typeof ScrollView>>) => {
    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollViewRef.current) {
                const scrollView = scrollViewRef.current as any;
                scrollView.scrollToEnd?.({ animated: true });
            }
        }, 100);
    };

    return { scrollToBottom };
};

export const useClickOutside = (
    ref: React.RefObject<any>,
    callback: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
