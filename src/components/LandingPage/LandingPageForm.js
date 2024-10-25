import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAllExpense } from "../../redux/expenseSlice";
import { removeAllTransactions } from "../../redux/transactionSlice";
import {
  resetAllBudget,
  updateCategoricalBudget,
  updateMonthlyBudget,
  updateUserName,
} from "../../redux/userSlice";
import validateLandingPageForm from "../../utilityFunctions/LandingPageFormMethods";
import BudgetTable from "./BudgetTable";
import "./LandingPageForm.css";

const LandingPageForm = () => {


  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.userName);
  const [monthlyBudget, setMonthlyBudget] = useState(user.monthlyBudget);
  const [categoricalBudget, setCategoricalBudget] = useState({
    food: user.categoricalBudget.food,
    travel: user.categoricalBudget.travel,
    entertainment: user.categoricalBudget.entertainment,
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (validateLandingPageForm(userName, monthlyBudget, categoricalBudget)) {
      const othersBudget =
        monthlyBudget -
        (categoricalBudget.food +
          categoricalBudget.travel +
          categoricalBudget.entertainment);

      const newCategoricalBudget = {
        ...categoricalBudget,
        others: othersBudget,
      };

      dispatch(updateUserName(userName));
      dispatch(updateMonthlyBudget(monthlyBudget));
      dispatch(updateCategoricalBudget(newCategoricalBudget));

      let message = user.userName ? "Updated " : "Submitted ";
      message += "your budget details";

      toast.success(message);
      navigate("/tracker");
    }
  };

  const resetTransactions = () => {
    const confirmDelete = window.confirm(
      "This will delete all previous transactions"
    );
    if (confirmDelete === true) {
      dispatch(resetAllBudget());
      dispatch(removeAllTransactions());
      dispatch(resetAllExpense());

      setUserName("");
      setMonthlyBudget("");
      setCategoricalBudget({
        food: "",
        travel: "",
        entertainment: "",
      });

      toast.success("Deleted all previous transactions");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-form">
        <div className="heading1">Welcome to your own Expense Tracker</div>
        <div className="heading2">
          Please fill in the below form to start tracking
        </div>
        <form
          name="landing-page-form"
          className="form-container"
          onSubmit={formSubmitHandler}
        >
          <div>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="budget">Enter your monthly budget: </label>
            <input
              id="budget"
              type="number"
              value={monthlyBudget}
              onChange={(e) =>
                e.target.value === ""
                  ? setMonthlyBudget("")
                  : setMonthlyBudget(parseInt(e.target.value))
              }
            />
          </div>
          <div>
            <div>Fill your monthly categorical budget: </div>
            <BudgetTable
              categoricalBudget={categoricalBudget}
              setCategoricalBudget={setCategoricalBudget}
            />
          </div>
          <div className="form-btn">
            <button type="submit" className="submit-btn">
              {user.userName ? "Update budget" : "Submit"}
            </button>
            {user.userName && (
              <>
                <button
                  type="button"
                  id="clear"
                  className="clear-btn"
                  onClick={resetTransactions}
                >
                  Start new tracker
                </button>

                <Link to={"/tracker"}>
                  <button className="navigate-tracker-btn">Go Back ←</button>
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPageForm;
