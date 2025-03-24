import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { login } from '../services/authApi'
import { useNavigate } from 'react-router-dom'
import LinkButton from '../components/LinkButton'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverMessage, setServerMessage] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    
    try {
      const response = await login(data)
      setServerMessage({ type: 'sucess', text: response.message })
      navMainMenu()
    } catch (error) {
      setServerMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong!",
      })
    }
  }

  const navMainMenu = () => {
    navigate("/");
  };

  return (
    <div>
    <h2>Login</h2>
    {serverMessage && (
      <p>{serverMessage.text}</p>
    )}
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="username"
        label="Username"
        register={register}
        registerOptions={{ required: "Username is required" }}
        error={errors.username}
      />
      <TextInput
        type='password'
        name="password"
        label="Password"
        register={register}
        registerOptions={{ required: "Password is required" }}
        error={errors.password}
      />
      <Button type="submit">Login</Button>
    </form>
    <LinkButton to='/'>Main Menu</LinkButton>
  </div>
  )
}

export default Login