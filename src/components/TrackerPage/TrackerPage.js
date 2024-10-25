import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllBudgetInsights from "./AllBudgetInsights";
import ExpenseForm from "./ExpenseForm";
import TransactionTable from "./TransactionTable/TransactionTable";
import "./TrackerPage.css"

const TrackerPage = () => {
  const {userName} = useSelector((store) => store.user);
  const navigate = useNavigate()

  window.onload = () => {
    navigate("/")
  }

  return (
    <div className="tracker-page">
      <div className="tracker-page-title">
        <h2 className="text-capitalize">{userName}'s monthly expenditure</h2>
        <Link to={"/"}>
          <button id="new-update">New/Update tracker</button>
        </Link>
      </div>
      <hr />
      <AllBudgetInsights />
      <hr />
      <ExpenseForm />
      <hr />
      <TransactionTable />
      <hr />
    </div>
  );
};

export default TrackerPage;
