import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { User } from './types/User';

const url = "http://localhost:3000/api/users";

export const fetchUser = createAsyncThunk('user/fetch', async (userId: number, thunkApi) => {
    try {
        const response = await axios.get(`${url}/${userId}`);
        return response.data as User;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return thunkApi.rejectWithValue(error);
    }
});

export const registerUser = createAsyncThunk('user/register', async (user: Partial<User>, thunkApi) => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/register", user);
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return thunkApi.rejectWithValue('An unknown error occurred');
    }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }: { email: string, password: string }, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return thunkApi.rejectWithValue('Failed to login');
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
            });
    },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
