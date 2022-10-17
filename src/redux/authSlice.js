import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://firstbanktask.herokuapp.com"

export const adminLogin = createAsyncThunk("Admin Login", async (adminData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${URL}/api/admin/login`, adminData)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const CreateclientAcc = createAsyncThunk("Create Client Account", async (clientData, { rejectWithValue, getState }) => {
    try {
        const config = {
            headers: {
                authorization: getState().auth.adLogin.token
            }
        }
        const { data } = await axios.post(`${URL}/api/admin/newclient`, clientData, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const AdminGetAllClients = createAsyncThunk("Admin Get All Clients", async (clientData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${URL}/api/admin/getallclients`)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const adminClientUpdate = createAsyncThunk("Admin Client Update", async (clientData, { rejectWithValue, getState }) => {
    try {
        const config = {
            headers: {
                authorization: getState().auth.adLogin.token
            }
        }
        const { data } = await axios.post(`${URL}/api/admin/updateclient`, clientData, config)
        return data.result
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const authslice = createSlice({
    name: "auth",
    initialState: {
        adLogin: null,
        allClients: []
    },
    reducers: {
        adminLogoutAction(state) {
            state.adLogin = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(adminLogin.pending, (state, { payload }) => {
                state.adLoading = true
            })
            .addCase(adminLogin.fulfilled, (state, { payload }) => {
                state.adLoading = false
                state.adLogin = payload
            })
            .addCase(adminLogin.rejected, (state, { payload }) => {
                state.adLoading = false
                state.adminLoadingerror = payload
            })



            .addCase(CreateclientAcc.pending, (state, { payload }) => {
                state.clientLoading = true
                state.client = null
                state.adminUpdateClient = null
                state.adminUpdateClient = null
            })
            .addCase(CreateclientAcc.fulfilled, (state, { payload }) => {
                state.clientLoading = false
                state.client = payload
            })
            .addCase(CreateclientAcc.rejected, (state, { payload }) => {
                state.clientLoading = false
                state.clienterror = payload
            })



            .addCase(AdminGetAllClients.pending, (state, { payload }) => {
                state.clientLoading = true
                state.adminUpdateClient = null
                state.client = null
                state.adminUpdateClient = null

            })
            .addCase(AdminGetAllClients.fulfilled, (state, { payload }) => {
                state.clientLoading = false
                state.allClients = payload
                state.adminUpdateClient = null

            })
            .addCase(AdminGetAllClients.rejected, (state, { payload }) => {
                state.clientLoading = false
                state.clienterror = payload
            })



            .addCase(adminClientUpdate.pending, (state, { payload }) => {
                state.clientLoading = true
                state.adminUpdateClient = null
                state.client = null
            })
            .addCase(adminClientUpdate.fulfilled, (state, { payload }) => {
                state.clientLoading = false
                state.adminUpdateClient = payload
            })
            .addCase(adminClientUpdate.rejected, (state, { payload }) => {
                state.clientLoading = false
                state.clienterror = payload
            })

    }
})
export default authslice.reducer

export const { adminLogoutAction } = authslice.actions