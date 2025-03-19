import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../components/TextInput'
import { createCharacter } from '../services/characterApi'
import Button from '../components/Button'
import styles from '../styles/CreateCharacter.module.css'

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
    <div className={styles.formContainer}>
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
      <Button type="submit">Create Character</Button>
    </form>
  </div>
  )
}

export default CreateCharacter