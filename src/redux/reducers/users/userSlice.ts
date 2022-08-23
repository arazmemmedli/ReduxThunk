import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/types";
import { RootState } from "../../store";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const response = await axios.get(USERS_URL);
        const usersData: IUser[] = response.data
        return usersData;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
})

const state: IUser[] = [];

const usersSlice = createSlice({
    name: "araz",
    initialState: state,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            if (action.payload) {
                const users = action.payload as IUser[]
                return users
            }
        })
    }
})

export const selectAllUsers = (state: RootState) => state.users

export default usersSlice.reducer;