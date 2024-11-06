import { ChatSupport } from './ChatSupport';
import { ChatContent } from './ChatContent';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { ChatSearchResults } from './ChatSearchResults';
import { useChatFocus, useChatScroll, useClickOutside } from './hooks';

// Re-export only what's needed, avoiding naming conflicts
export {
    ChatSupport,
    // Internal components not needed in the main export
    useChatFocus,
    useChatScroll,
    useClickOutside
};
