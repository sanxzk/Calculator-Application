import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setErrorNull } from '../../store/auth/authSlice';
import { toast } from 'react-toastify';
import HistoryComponent from '../../components/HistoryComponent/HistoryComponent';
import Calculator from '../../components/Calculator/Calculator';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { authToken, isError, errorMessage, isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    if (authToken) {
      dispatch(getUser(authToken))
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(setErrorNull());
    }
  }, [authToken, dispatch, errorMessage, isError])
  return (
    <div className='calculator-parent-container'>
    <Calculator />
      {isLoggedIn ? <HistoryComponent /> : <p style={{ margin: "auto 0rem", fontStyle: "monospace", fontSize: "2rem" }}> <Link to='/signup'> Signup </Link>to record History</p>}
    </div>
  )
}

export default Home