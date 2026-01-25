import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserAvatar } from "../../api/auth/verify-otp/types";

export type UserState = {
    isLoggedIn: boolean,
    name?: string
} & Partial<UserAvatar>

export const initialUserState: UserState = {
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        updateLoginStatus: (state, action: PayloadAction<UserState>) => {
            state = action.payload;
        },
        updateName: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name;
        }
    }
})

export const { updateLoginStatus, updateName } = userSlice.actions;

export const userReducer = userSlice.reducer;