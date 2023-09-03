import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import './Signup.css'
import {  setErrorNull, signup } from '../../store/auth/authSlice'
import { toast } from 'react-toastify'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isError, errorMessage, user, authToken } = useSelector(state => state.auth);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""

  })
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // alert(JSON.stringify(userData))
    dispatch(signup(userData))
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
      <form onSubmit={handleSubmit} className='signup-form'>
        <span>Signup</span>
        <input onChange={onChangeHandler} className='signup-form-input' name='name' type='text' placeholder='Name' />
        <input onChange={onChangeHandler} className='signup-form-input' name='email' type='email' placeholder='email' />
        <input onChange={onChangeHandler} className='signup-form-input' name='password' type='password' placeholder='password' />
        <button onClick={handleSubmit} type='submit' className='signup-form-submit-btn'> Signup</button>
        <p>Already registered <Link to='/login'>Login</Link> </p>
      </form>
    </div>
  )
}

export default Signup