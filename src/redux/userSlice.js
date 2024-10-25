import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",

    initialState: {
        userName: "",
        monthlyBudget: "",
        categoricalBudget: {
            food: "",
            travel: "",
            entertainment: "",
            othrts: "",
        },
        activeFilter: "all",
    },

    reducers: {
        updateUserName: (state, action) => {
            state.userName = action.payload
        },

        updateMonthlyBudget: (state, action) => {
            state.monthlyBudget = action.payload
        },

        updateCategoricalBudget: (state, action) => {
            state.categoricalBudget = {
              ...state.categoricalBudget,
              ...action.payload,
            };
      
            return state;
        },

        updateActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },

        resetAllBudget: (state) => {
            state.userName = ""
            state.monthlyBudget = ""
            state.categoricalBudget = {
                food: "",
                travel: "",
                entertainment: "",
            }
            state.activeFilter = "all"
        }
    }
})

export const {
    updateUserName,
    updateMonthlyBudget,
    updateCategoricalBudget,
    updateActiveFilter,
    resetAllBudget,

} = userSlice.actions;


export default userSlice.reducer;