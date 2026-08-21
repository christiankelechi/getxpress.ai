import { axiosInstancePrivate } from "../auth/api";



export const createChat = async(payload) => {
    const response = await axiosInstancePrivate.post(`/message/prompt/`, payload);
    return response.data;
    
}



export const getChatHistory = async(query) => {
    const response = await axiosInstancePrivate.get(`/message/prompt/?${query}`)
    return response.data;
}