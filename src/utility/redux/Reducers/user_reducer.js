// features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// initialState: uygulamanın başındaki default state
const initialState = {
   user: null,
};

const userSlice = createSlice({
   name: "user", // state adı
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      clearUser: (state) => {
         state.user = null; // Kullanıcıyı temizle
      },
   },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
