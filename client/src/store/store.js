import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice";
import calculationSlice from "./History/calculationSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        calculation: calculationSlice
    }
})

export default store;