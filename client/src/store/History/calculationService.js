import axios from 'axios'


// const API_URL = 'http://localhost:5000/api/calculation'
const API_URL = 'https://calculator-backend-rho.vercel.app/api/calculation'

//addHistory
const addCalculation = async ({calculation,authToken}) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json", 
                authToken:authToken
            }
        }
        const response = await axios.post(API_URL + "/addcalculation", calculation, config);
        // console.log(response)
        return response.data
    } catch (err) {
        throw new Error(err.message)
    }
}

//get all calculations 
const getAllCalculations = async (authToken) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken
            }
        }
        const response = await axios.get(API_URL + "/getallcalculations", config);
        return response.data;
    } catch (err) {
        throw new Error(err.message)
    }
}

//delete all calculations
const deleteCalculation = async({id, authToken}) =>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken,
                "calculationid":id
            }
        }
        console.log(config)
        const response = await axios.delete(API_URL + "/deletecalculation", config);
        return response.data;
    } catch (err) {
        throw new Error(err.message)
    }
}

const calculationService = {
    addCalculation,
    getAllCalculations,
    deleteCalculation
}

export default calculationService