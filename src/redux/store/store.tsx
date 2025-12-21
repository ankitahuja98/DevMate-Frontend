import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import userReducer from "../slices/userSlice";

import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer, user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
