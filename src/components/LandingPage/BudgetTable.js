import React from "react";
import "./LandingPageForm";


const BudgetTable = ({ categoricalBudget, setCategoricalBudget }) => {
  function updateCategoricalBudget(text, categoryName) {
    // If input is empty
    if (text === "") {
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: "",
      }));
    }
    // if input is not empty
    else {
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: parseInt(text),
      }));
    }
  }

  return (
    <table id="budgetTable">
      <thead>
        <tr>
          <th>Food</th>
          <th>Travel</th>
          <th>Entertainment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              id="food"
              type="number"
              value={categoricalBudget.food}
              onChange={(e) => updateCategoricalBudget(e.target.value, "food")}
            />
          </td>
          <td>
            <input
              id="travel"
              type="number"
              value={categoricalBudget.travel}
              onChange={(e) =>
                updateCategoricalBudget(e.target.value, "travel")
              }
            />
          </td>
          <td>
            <input
              id="entertainment"
              type="number"
              value={categoricalBudget.entertainment}
              onChange={(e) =>
                updateCategoricalBudget(e.target.value, "entertainment")
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BudgetTable;
