// features/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// initialState: uygulamanın başındaki default state
const initialState = {
   count: 0,
};

const counterSlice = createSlice({
   name: "counter", // state adı
   initialState,
   reducers: {
      increment: (state) => {
         state.count += 1; // count değerini arttırır
      },
      decrement: (state) => {
         state.count -= 1; // count değerini azaltır
      },
      reset: (state) => {
         state.count = 0; // count'u sıfırlar
      },
   },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
