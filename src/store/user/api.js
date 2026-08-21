import { axiosInstancePrivate } from "../auth/api";



export const createChat = async(payload) => {
    const response = await axiosInstancePrivate.post(`/message/prompt/`, payload);
    return response.data;
    
}



export const getChatHistory = async(query) => {
    const response = await axiosInstancePrivate.get(`/message/prompt/?${query}`)
    return response.data;
}

export const getChatById = async(chatId, page = 1, limit = 50) => {
    const response = await axiosInstancePrivate.get(`/message/chat/chat-id/?chat_id=${chatId}&page=${page}&limit=${limit}`);
    return response.data;
}