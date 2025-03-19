import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../components/TextInput'
import { createCharacter } from '../services/characterApi'

const CreateCharacter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [serverMessage, setServerMessage] = useState("")

  const onSubmit = async (data) => {
    try {
      const response = await createCharacter(data)
      setServerMessage({ type: "success", text: response.message })
      reset()
    } catch (error) {
      setServerMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong!",
      })
    }
  }

  return (
    <div className="form-container">
    <h2>Create Character</h2>
    {serverMessage && (
      <p>{serverMessage.text}</p>
    )}
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="name"
        label="Name"
        register={register}
        registerOptions={{ required: "Name is required" }}
        error={errors.username}
      />
      <TextInput
        name="class_type"
        label="Class"
        register={register}
        registerOptions={{ required: "Class is required" }}
        error={errors.password}
      />
      <button type="submit">Create Character</button>
    </form>
  </div>
  )
}

export default CreateCharacter