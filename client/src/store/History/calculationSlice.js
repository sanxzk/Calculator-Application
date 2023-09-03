import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import calculationService from "./calculationService";

const initialState = {
    history: [],
    isError: null,
    errorMessage: null
}
export const addCalculation = createAsyncThunk('auth/addCalculation', async (calculation, thunkAPI) => {
    try {
        const response = await calculationService.addCalculation(calculation);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getAllCalculations = createAsyncThunk('auth/getAllCalculations', async (authToken, thunkAPI) => {
    try {
        const response = await calculationService.getAllCalculations(authToken);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deletecalculation = createAsyncThunk('auth/deletecalculation', async ({authToken,id}, thunkAPI) => {
    try {
        const response = await calculationService.deleteCalculation({authToken,id});
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const calculationSlice = createSlice({
    name: 'calculation',
    initialState,
    reducers: {
        setErrorNull: (state) => {
            state.isError = false;
            state.errorMessage = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addCalculation.rejected, (state, action) => {
                state.isError = true;
                state.errorMessage = "Calculation saving failed"
            })
            .addCase(addCalculation.fulfilled, (state, action) => {
                state.history.push(action.payload.savedCalculation);
            })
            .addCase(getAllCalculations.rejected,(state,action)=>{
                state.isError = true
                state.errorMessage = "Unable to fetch history";
            })
            .addCase(getAllCalculations.fulfilled, (state,action)=>{
                state.history = action.payload.calculations
            })
            .addCase(deletecalculation.rejected, (state)=>{
                state.isError = true;
                state.errorMessage = "Calucation Deletion failed";
            })

    }
})
export const { setErrorNull, logout } = calculationSlice.actions;
export default calculationSlice.reducer;