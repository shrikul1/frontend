import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const URL = "http://localhost:5000"
export const loginUser = createAsyncThunk("Login User", async (Credential, { rejectWithValue }) => {
    try {
        console.log(Credential)
        const { data } = await axios.post(`${URL}/api/client/login`, Credential)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const getAllTransactions = createAsyncThunk("Get All Transactions", async (Credential, { rejectWithValue, getState }) => {
    try {
        console.log(Credential)
        const config = {
            headers: {
                authorization: getState().users.login.token
            }
        }
        const { data } = await axios.get(`${URL}/api/client/alltransactions`, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const clientUpdate = createAsyncThunk("Client Info Update", async (Credential, { rejectWithValue, getState }) => {
    try {
        console.log(Credential)
        const config = {
            headers: {
                authorization: getState().users.login.token
            }
        }
        const { data } = await axios.post(`${URL}/api/client/update`, Credential, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const clientChangePassword = createAsyncThunk("Change Password", async (Credential, { rejectWithValue, getState }) => {
    try {
        const config = {
            headers: {
                authorization: getState().users.login.token
            }
        }
        console.log(Credential)
        const { data } = await axios.post(`${URL}/api/client/changepassword`, Credential, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const transaction = createAsyncThunk("Transaction", async (Credential, { rejectWithValue, getState }) => {
    try {
        const config = {
            headers: {
                authorization: getState().users.login.token
            }
        }
        console.log(Credential)
        const { data } = await axios.post(`${URL}/api/client/transaction`, Credential, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})



const userSlice = createSlice({
    name: "user",
    initialState: {
        login: null,
        allTransactions: []
    },
    reducers: {
        logoutAction(state) {
            state.login = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, { payload }) => {
                state.loading = true
                state.ChangePassword = null
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.login = payload
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false
                state.loginerror = payload
            })




            .addCase(getAllTransactions.pending, (state, { payload }) => {
                state.loading = true
                state.transactionStatus = null
            })
            .addCase(getAllTransactions.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allTransactions = payload
            })
            .addCase(getAllTransactions.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(clientUpdate.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(clientUpdate.fulfilled, (state, { payload }) => {
                state.loading = false
                state.clientInfoUpdated = payload
            })
            .addCase(clientUpdate.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })


            .addCase(clientChangePassword.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(clientChangePassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.ChangePassword = payload
            })
            .addCase(clientChangePassword.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

            .addCase(transaction.pending, (state, { payload }) => {
                state.loading = true
                state.transactionStatus = null
            })
            .addCase(transaction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.transactionStatus = payload
            })
            .addCase(transaction.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })

    }
})
export default userSlice.reducer
export const { logoutAction } = userSlice.actions