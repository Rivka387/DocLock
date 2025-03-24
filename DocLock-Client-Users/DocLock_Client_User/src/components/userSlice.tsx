import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootStore } from './store';
import { User } from '../types/User';
import { Roles } from '../types/Roles';

const url = "http://localhost:3000/api";


export const fetchUser = createAsyncThunk('user/fetch', async (userId: number, thunkApi) => {
    try {
        const response = await axios.get(`${url}/User/${userId}`);
        return response.data as User;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue(error);
    }
});


export const registerUser = createAsyncThunk('user/register', async (user: Partial<User>, thunkApi) => {
    try {
        const res = await axios.post(`${url}/Auth/register`, user,{ headers: { "Content-Type": "application/json" } });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('An unknown error occurred');
    }
});


export const deleteUser = createAsyncThunk('user/delete', async (userId: number, thunkApi) => {
    try {
        await axios.delete(`${url}/User/${userId}`);
        return userId;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('Failed to delete user');
    }
});


export const loginUser = createAsyncThunk('user/login', async ({ email, password }: { email: string, password: string }, thunkApi) => {
    try {
        const response = await axios.post(`${url}/Auth/login`, { email, password, roles: [Roles.User] }, { headers: { "Content-Type": "application/json" } });
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('Failed to login');
    }
});


export const getUserByEmail = createAsyncThunk('user/getByEmail', async (email: string, thunkApi) => {
    try {
        const response = await axios.get(`${url}/User/${email}`);
        return response.data as User;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('Failed to get user by email');
    }
});


export const updateName = createAsyncThunk('user/updateName', async ({ id, name }: { id: number, name: string }, thunkApi) => {
    try {
        const response = await axios.put(`${url}/name/${id}`, { name },{ headers: { "Content-Type": "application/json" } });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('Failed to update name');
    }
});


export const updatePassword = createAsyncThunk('user/updatePassword', async ({ id, password }: { id: number, password: string }, thunkApi) => {
    try {
        const response = await axios.put(`${url}/password/${id}`, { password },{ headers: { "Content-Type": "application/json" } });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            thunkApi.rejectWithValue(error.message)
        }
        return thunkApi.rejectWithValue('Failed to update password');
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as User,
        token: null as string | null,
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load user";
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.Token;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to register user";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
                state.user = {} as User;
                state.token = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete user";
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.Token;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to login";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByEmail.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getUserByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to get user by email";
            })
            .addCase(getUserByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateName.fulfilled, (state, action) => {
                state.user.name = action.payload.name;
                state.loading = false;
            })
            .addCase(updateName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update name";
            })
            .addCase(updateName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update password";
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});

export const selectUser = (state: RootStore) => state.user;
export const { } = userSlice.actions;
export default userSlice;