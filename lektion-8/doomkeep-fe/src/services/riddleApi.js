import axiosInstance from './axiosInstance'

export const getRiddle = async ({ name, classType }) => {
  try {
    const response = await axiosInstance.post('/generate-riddle', {
      name: name,
      class_type: classType
    })
    return response.data
  } catch (error) {
    console.error('Error fetching riddle', error)
    throw error
  }
}