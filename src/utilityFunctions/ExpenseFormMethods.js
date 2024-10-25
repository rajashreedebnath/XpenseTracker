import toast from "react-hot-toast";

function generateExpenseFormAlertMessage(
  monthlyBudgetBalance,
  categoricalBudgetBalance,
  expenseCategory
) {
  let alertMessage = "Do you want to add new Expense?";
  let toasterErrorFlag = false;
  let toasterMessage = "Expense added successfully";

  if (monthlyBudgetBalance < 0 && categoricalBudgetBalance < 0) {
    alertMessage = `Hey your Monthly and ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense and ${expenseCategory} expense exceeded`;
  } else if (categoricalBudgetBalance < 0) {
    alertMessage = `Hey your ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage =
      expenseCategory.charAt(0).toUpperCase() +
      expenseCategory.slice(1) +
      `expense exceeded`;
  } else if (monthlyBudgetBalance < 0) {
    alertMessage = `Hey your Monthly expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense exceeded`;
  }

  return { alertMessage, toasterErrorFlag, toasterMessage };
}

function validateExpenseForm(expenseName, expenseAmount, expenseCategory) {
  if (!expenseName.trim() || expenseAmount === "" || expenseCategory === "") {
    toast.error("All Fields are required!");
    return false;
  }
  return true;
}

export { generateExpenseFormAlertMessage, validateExpenseForm };
