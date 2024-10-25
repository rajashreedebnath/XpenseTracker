import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoricalExpense,
  updateTotalExpense,
} from "../../redux/expenseSlice";
import { addTransactionEntry } from "../../redux/transactionSlice";
import {
  generateExpenseFormAlertMessage,
  validateExpenseForm,
} from "../../utilityFunctions/ExpenseFormMethods";
import generateUniqueID from "../../utilityFunctions/GenerateIds";
import "./ExpenseForm.css";
import { ADD } from "../../utilityFunctions/constants";

const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  const { monthlyBudget, categoricalBudget } = useSelector(
    (store) => store.user
  );
  const { totalExpense, categoricalExpense } = useSelector(
    (store) => store.expense
  );

  const dispatch = useDispatch();

  const newExpenseFormSubmitHandler = (event) => {
    event.preventDefault();

    if (validateExpenseForm(expenseName, expenseAmount, expenseCategory)) {
      const monthlyBudgetBalance =
        monthlyBudget - (totalExpense + expenseAmount);
      const categoricalBudgetBalance =
        categoricalBudget[expenseCategory] -
        (categoricalExpense[expenseCategory] + expenseAmount);

      const { alertMessage, toasterErrorFlag, toasterMessage } =
        generateExpenseFormAlertMessage(
          monthlyBudgetBalance,
          categoricalBudgetBalance,
          expenseCategory
        );

      const confirmNewExpense = window.confirm(alertMessage);

      if (confirmNewExpense) {
        dispatch(updateTotalExpense({ amount: expenseAmount, operation: ADD }));
        dispatch(
          updateCategoricalExpense({
            amount: expenseAmount,
            category: expenseCategory,
            operation: ADD,
          })
        );

        dispatch(
          addTransactionEntry({
            id: generateUniqueID(),
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
          })
        );

        setExpenseName("");
        setExpenseAmount("");
        setExpenseCategory("");

        if (toasterErrorFlag) {
          toast.error(toasterMessage);
        } else {
          toast.success(toasterMessage);
        }
      }
    }
  };

  return (
    <div className="expense-form">
      <div className="title">New Expense Form </div>
      <form className="expense-form1" onSubmit={newExpenseFormSubmitHandler}>
        <div className="expense-form-input">
          <div>
            <label htmlFor="expense-name">Expense Name: </label>
            <input
              type="text"
              id="expense-name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category-select">Select category: </label>
            <select
              id="category-select"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            >
              <option value={""}>--select--</option>
              <option value={"food"}>Food</option>
              <option value={"travel"}>Travel</option>
              <option value={"entertainment"}>Entertainment</option>
              <option value={"others"}>Others</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="expense-amount">Expense Amount: </label>
          <input
            type="number"
            id="expense-amount"
            value={expenseAmount}
            onChange={(e) =>
              e.target.value === ""
                ? setExpenseAmount("")
                : setExpenseAmount(parseInt(e.target.value))
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
