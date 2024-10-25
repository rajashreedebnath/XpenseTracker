import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expenseSlice";
import transactionSlice from "./transactionSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    expense: expenseSlice,
    transactions: transactionSlice,
  },
});

export default store;
