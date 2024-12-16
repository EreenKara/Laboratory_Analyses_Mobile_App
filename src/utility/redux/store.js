// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user_reducer"; // Reducer'larınızı buraya dahil edeceksiniz

const store = configureStore({
   reducer: {
      // Reducer'ları burada belirtiyoruz
      user: userReducer,
   },
});
export default store;
