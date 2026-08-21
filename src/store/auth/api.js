import axios from "axios";
import useUserStore from "../../hooks/storage/userStore";
const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export const axiosInstancePrivate = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
      },
  });

 
  
  // Add interceptor to inject token before every request
  axiosInstancePrivate.interceptors.request.use(
    (config) => {
        const { user } = useUserStore.getState();
      if (user?.access_token) {
        config.headers.Authorization = `Bearer ${user?.access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

//AUTH APIS
export const loginAuth = async(credentials) => {
    const response = await axiosInstancePrivate.post('/auth/login/', credentials);
    return response.data;
    
}

export const signUpAuth = async(credentials) => {
    const response = await axiosInstancePrivate.post(`/auth/register/`, credentials);
    return response.data;
    
}