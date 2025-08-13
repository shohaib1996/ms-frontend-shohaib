import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
interface Message {
    _id: string;
    [key: string]: any;
}

interface Chat {
    _id: string;
    latestMessage?: any;
    isRead?: boolean;
    toRead?: any[];
    myData?: {
        [key: string]: any;
    };
    [key: string]: any;
}

interface User {
    _id: string;
    [key: string]: any;
}

interface ChatState {
    chats: Chat[];
    onlineUsers: User[];
    chatMessages: {
        [chatId: string]: Message[];
    };
}

// Initial state
const initialState: ChatState = {
    chats: [],
    onlineUsers: [],
    chatMessages: {},
};

// Create slice
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        updateChats: (state, action: PayloadAction<Chat>) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload._id,
            );
            if (index === -1) {
                state.chats.unshift(action.payload);
            } else {
                state.chats[index] = {
                    ...state.chats[index],
                    ...action.payload,
                };
            }
        },
        updateMyData: (
            state,
            action: PayloadAction<{ _id: string; field: string; value: any }>,
        ) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload._id,
            );
            if (index === -1) {
                // This logic is questionable in the original code,
                // as it would add a chat with just _id and myData
                state.chats.unshift({
                    _id: action.payload._id,
                    myData: {},
                } as Chat);
            } else {
                if (!state.chats[index].myData) {
                    state.chats[index].myData = {};
                }
                state.chats[index].myData = {
                    ...state.chats[index].myData,
                    [action.payload.field]: action.payload.value,
                };
            }
        },
        addChat: (state, action: PayloadAction<Chat>) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload._id,
            );
            if (index === -1) {
                state.chats.unshift(action.payload);
            }
        },
        updateLatestMessage: (
            state,
            action: PayloadAction<{ chatId: string; latestMessage: any }>,
        ) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload.chatId,
            );
            if (index !== -1) {
                state.chats[index].latestMessage = action.payload.latestMessage;
                state.chats[index].toRead = [];
            }
        },
        markRead: (state, action: PayloadAction<string>) => {
            const index = state.chats.findIndex(
                (chat) => chat._id === action.payload,
            );
            if (index !== -1) {
                state.chats[index].isRead = true;
            }
        },
        setOnlineUsers: (state, action: PayloadAction<User[]>) => {
            state.onlineUsers = action.payload;
        },
        addOnlineUser: (state, action: PayloadAction<User>) => {
            const index = state.onlineUsers.findIndex(
                (user) => user._id === action.payload._id,
            );
            if (index === -1) {
                state.onlineUsers.unshift(action.payload);
            }
        },
        removeOnlineUser: (state, action: PayloadAction<User>) => {
            state.onlineUsers = state.onlineUsers.filter(
                (user) => user._id !== action.payload?._id,
            );
        },
        updateChatMessages: (
            state,
            action: PayloadAction<{ chat: string; messages: Message[] }>,
        ) => {
            state.chatMessages[action.payload.chat] = action.payload.messages;
        },
        pushMessage: (
            state,
            action: PayloadAction<{ chat: string; message: Message }>,
        ) => {
            const chatId = action.payload.chat;
            const newMessage = action.payload.message;

            if (!state.chatMessages[chatId]) {
                state.chatMessages[chatId] = [];
            }

            const messageIndex = state.chatMessages[chatId].findIndex(
                (m) => m._id === newMessage._id,
            );

            if (messageIndex !== -1) {
                state.chatMessages[chatId][messageIndex] = {
                    ...state.chatMessages[chatId][messageIndex],
                    ...newMessage,
                };
            } else {
                state.chatMessages[chatId].push(newMessage);
                // Keep only the last 30 messages
                if (state.chatMessages[chatId].length > 30) {
                    state.chatMessages[chatId] =
                        state.chatMessages[chatId].slice(-30);
                }
            }
        },
        updateMessage: (
            state,
            action: PayloadAction<{ chat: string; message: Message }>,
        ) => {
            const chatId = action.payload.chat;
            const updatedMessage = action.payload.message;

            if (state.chatMessages[chatId]) {
                const messageIndex = state.chatMessages[chatId].findIndex(
                    (m) => m._id === updatedMessage._id,
                );

                if (messageIndex !== -1) {
                    state.chatMessages[chatId][messageIndex] = {
                        ...state.chatMessages[chatId][messageIndex],
                        ...updatedMessage,
                    };
                }
            }
        },
    },
});

// Export actions and reducer
export const {
    setChats,
    updateChats,
    updateMyData,
    addChat,
    updateLatestMessage,
    markRead,
    setOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    updateChatMessages,
    pushMessage,
    updateMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
