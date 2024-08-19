import { createSlice } from "@reduxjs/toolkit"; 
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { User } from "../utils/dataStructure";

const initialState: User = {
    username: 'correo@dominio.com',
    password: 'p@ssword1',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateCredentials: (state, action: PayloadAction<User>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    }
});

export const { updateCredentials } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;