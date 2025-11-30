import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
