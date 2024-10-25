import React from "react";
import { useSelector } from "react-redux";
import "./AllBudgetInsights.css"

const LimitStatusPill = ({ balance }) => {
  let isLimitExceeded = balance < 0;
  let LimitStatusText = balance < 0 ? "exceed" : "within";

  return (
    <div className={isLimitExceeded ? "limit-exceed-btn" : "limit-within-btn"}>
      {LimitStatusText}
    </div>
  );
};

const AllBudgetInsights = () => {
  const { monthlyBudget, categoricalBudget } = useSelector(
    (store) => store.user
  );

  const { totalExpense, categoricalExpense } = useSelector(
    (store) => store.expense
  );

  const totalMonthlyBalance = monthlyBudget - totalExpense;

  const categoricalBalance = {
    food: categoricalBudget.food - categoricalExpense.food,
    travel: categoricalBudget.travel - categoricalExpense.travel,
    entertainment:
      categoricalBudget.entertainment - categoricalExpense.entertainment,
    others: categoricalBudget.others - categoricalExpense.others,
  };

  return (
    <div className="insights">
      <table className="insight-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Limit Status</th>
            <th>Budget</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All</td>
            <td>
              <LimitStatusPill balance={totalMonthlyBalance} />
            </td>
            <td>{monthlyBudget}</td>
            <td>{totalExpense}</td>
            <td>{totalMonthlyBalance}</td>
          </tr>
          <tr>
            <td>Food</td>
            <td>
              <LimitStatusPill balance={categoricalBalance.food} />
            </td>
            <td>{categoricalBudget.food}</td>
            <td>{categoricalExpense.food}</td>
            <td>{categoricalBalance.food}</td>
          </tr>
          <tr>
            <td>Travel</td>
            <td>
              <LimitStatusPill balance={categoricalBalance.travel} />
            </td>
            <td>{categoricalBudget.travel}</td>
            <td>{categoricalExpense.travel}</td>
            <td>{categoricalBalance.travel}</td>
          </tr>
          <tr>
            <td>Entertainment</td>
            <td>
              <LimitStatusPill balance={categoricalBalance.entertainment} />
            </td>
            <td>{categoricalBudget.entertainment}</td>
            <td>{categoricalExpense.entertainment}</td>
            <td>{categoricalBalance.entertainment}</td>
          </tr>
          <tr>
            <td>Others</td>
            <td>
              <LimitStatusPill balance={categoricalBalance.others} />
            </td>
            <td>{categoricalBudget.others}</td>
            <td>{categoricalExpense.others}</td>
            <td>{categoricalBalance.others}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllBudgetInsights;
