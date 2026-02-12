import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    isLoggedIn: boolean,
    userId?:string,
    name?: string,
    avatarBg?:string,
};

export const initialUserState: UserState = {
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        updateLoginStatus: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        updateName: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name;
        }
    }
})

export const { updateLoginStatus, updateName } = userSlice.actions;

export const userReducer = userSlice.reducer;