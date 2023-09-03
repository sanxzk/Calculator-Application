import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService";

const authToken = localStorage.getItem('authToken')

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    authToken: authToken ? authToken : null,
    isError: false,
    errorMessage: null
}
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        console.log(userData)
        const response = await authService.login(userData);
        // console.log(response);
        if (response.success) return response;
        else {
            throw new Error(response.message);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const signup = createAsyncThunk('auth/signup', async (userData, thunkAPI) => {
    try {
        console.log(userData)
        const response = await authService.signup(userData);
        // console.log(response);
        if (response.success) return response;
        else {
            throw new Error(response.message);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getUser = createAsyncThunk('auth/getuser', async (authToken, thunkAPI) => {
    try {
        console.log(authToken)
        const response = await authService.getUser(authToken);
        // console.log(response);
        if (response.success) return response;
        else {
            throw new Error(response.message);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorNull: (state) => {
            state.isError = false;
            state.errorMessage = null;
        },
        logout: (state) => {
            localStorage.removeItem('authToken')
            state.user = null
            state.authToken = null
            state.isLoggedIn = false
            state.isError = false
            state.errorMessage = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = false;
                state.user = null;
                state.authToken = null;
                state.isError = true;
                state.errorMessage = "Please enter correct credentials"
                localStorage.removeItem('authToken')
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = true
                state.user = action.payload.loggedInUser;
                state.authToken = action.payload.authToken;
                localStorage.setItem('authToken', action.payload.authToken)
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = false;
                state.user = null;
                state.authToken = null;
                state.isError = true;
                state.errorMessage = "Please try again after some time"
                localStorage.removeItem('authToken')
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = true
                state.user = action.payload.loggedInUser;
                state.authToken = action.payload.authToken;
                localStorage.setItem('authToken', action.payload.authToken)

            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = false;
                state.user = null;
                state.authToken = null;
                state.isError = true;
                state.errorMessage = "Please Login again"
                localStorage.removeItem('authToken')
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isLoggedIn = true
                state.user = action.payload.user;
            })
    }
})
export const { setErrorNull, logout } = authSlice.actions;
export default authSlice.reducer;