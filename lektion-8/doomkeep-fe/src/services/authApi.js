import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error    
  } 
}