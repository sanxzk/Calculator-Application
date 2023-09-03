import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import './Login.css'
import { login, setErrorNull } from '../../store/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isError, errorMessage, user, authToken } = useSelector(state => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: ""

  })
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(userData))
    dispatch(login(userData))
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(setErrorNull())
    }
    if (authToken || user) {
      navigate('/')
    }
  }, [isLoggedIn, isError, errorMessage, user, authToken, navigate, dispatch])
  return (
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
        <span>Login</span>
        <input onChange={onChangeHandler} className='login-form-input' name='email' type='email' placeholder='email' />
        <input onChange={onChangeHandler} className='login-form-input' name='password' type='password' placeholder='password' />
        <button onClick={handleSubmit} type='submit' className='login-form-submit-btn'> Login</button>
        <p>Don't have an account <Link to='/signup'>create Account</Link> </p>
      </form>
    </div>
  )
}

export default Login