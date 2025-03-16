import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

const store = configureStore({
    reducer: combineReducers({
        user: UserSlice.reducer
    }),
    
});

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;