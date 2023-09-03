import axios from 'axios'


// const API_URL = 'http://localhost:5000/api/auth'
const API_URL = 'https://calculator-backend-rho.vercel.app/api/auth'

//register user
const signup = async (userData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await axios.post(API_URL + "/createuser", userData, config);
        // console.log(response)
        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}

//login user
const login = async (userData) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log(userData)
        const response = await axios.post(API_URL + '/loginuser', userData, config)
        // console.log(response)
        return response.data
    } catch (err) {
        throw new Error(err.message)
    }

}

// getting loggedin user details
const getUser = async (authToken) => {
    try {
        const config = {
            headers: {
                "authToken": authToken
            }
        }
        // console.log(config)

        const response = await axios.get(API_URL + '/getuser', config);
        console.log("response.data = ", response.data.user)
        return response.data;

    } catch (err) {
        throw new Error(err.message)
    }
}


const authService = {
    signup,
    login,
    getUser
}

export default authService