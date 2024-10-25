import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",

  initialState: {
    totalExpense: 0,
    categoricalExpense: {
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    },
  },

  reducers: {
    updateTotalExpense: (state, action) => {
      const { amount, operation } = action.payload;

      if (operation === "add") {
        state.totalExpense = state.totalExpense + amount;
      } else {
        state.totalExpense = state.totalExpense - amount;
      }
    },

    updateCategoricalExpense: (state, action) => {
      const { amount, category, operation } = action.payload;
      let currentCategoryAmount = state.categoricalExpense[category];

      if (operation === "add") {
        currentCategoryAmount += amount;
      } else {
        currentCategoryAmount -= amount;
      }

      state.categoricalExpense = {
        ...state.categoricalExpense,
        [category]: currentCategoryAmount,
      };

      return state;
    },

    resetAllExpense: (state) => {
      state.totalExpense = 0;
      state.categoricalExpense = {
        food: 0,
        travel: 0,
        entertainment: 0,
        others: 0,
      };
      return state;
    },
  },
});

export const { updateTotalExpense, updateCategoricalExpense, resetAllExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
