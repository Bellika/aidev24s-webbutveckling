import axiosInstance from './axiosInstance'

export const getCharacter = async ({ id, name }) => {
  try {
    const params = {}

    if (id) params.id = id
    if (name) params.name = name 

    const response = await axiosInstance.get('/get-character', { params })
    console.log(response.data)
    return response.data.character
  } catch (error) {
    console.error('Error fetching characters', error)
    throw error
  }
}

export const createCharacter = async (characterData) => {
  try {
    const response = await axiosInstance.post('/create-character', characterData)
    return response.data
  } catch (error) {
    console.error("Error creating character:", error)
    throw error
  }
}