import toast from "react-hot-toast";

function validateLandingPageForm(userName, monthlyBudget, categoricalBudget) {
  if (
    !userName.trim() ||
    monthlyBudget === "" ||
    categoricalBudget.food === "" ||
    categoricalBudget.travel === "" ||
    categoricalBudget.entertainment === ""
  ) {
    toast.error("All Fields are required!");
    return false;
  }

  if (
    monthlyBudget <= 0 ||
    categoricalBudget.food <= 0 ||
    categoricalBudget.travel <= 0 ||
    categoricalBudget.entertainment <= 0
  ) {
    toast.error("Budget cannot be negative or zero");
    return false;
  }

  let totalCategoricalBudget =
    categoricalBudget.food +
    categoricalBudget.travel +
    categoricalBudget.entertainment;

  if (monthlyBudget < totalCategoricalBudget) {
    toast.error("Total Categorical budget should not exceed monthly budget");
    return false;
  }

  return true;
}

export default validateLandingPageForm;
