import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    theme:"light"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeTheme:(state,action) => {
            state.theme = action.payload ? "dark":"light"
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;
