import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",

  initialState: {
    transactionList: [],
  },

  reducers: {
    addTransactionEntry: (state, action) => {
      const userObj = {
        ...action.payload,
      };
      state.transactionList.push(userObj);
    },

    removeTransactionEntry: (state, action) => {
      state.transactionList = state.transactionList.filter(
        (transaction) => transaction.id !== action.payload
      );

      return state;
    },

    removeAllTransactions: (state) => {
      state.transactionList.length = 0;
    },
  },
});

export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
