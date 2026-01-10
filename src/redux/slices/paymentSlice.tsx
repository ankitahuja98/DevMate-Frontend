import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../actions/paymentAction";
import type { Payment, orderData } from "../types/paymentType";

const initialState: Payment = {
  order: {
    isOrderLoading: null,
    orderData: {} as orderData,
    isOrderError: null,
  },
};
const PaymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.order.isOrderError = false;
      state.order.isOrderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order.isOrderError = false;
      state.order.orderData = action.payload;
      state.order.isOrderLoading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.order.isOrderError = true;
      state.order.isOrderLoading = false;
    });
  },
});

export default PaymentSlice.reducer;
