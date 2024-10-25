import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeTransactionEntry } from "../../../redux/transactionSlice";
import {
  updateCategoricalExpense,
  updateTotalExpense,
} from "../../../redux/expenseSlice";
import { SUBTRACT } from "../../../utilityFunctions/constants";
import "./TransactionDetailsTable.css"

const TransactionDetailsTable = () => {
  const { transactionList } = useSelector((store) => store.transactions);
  const { activeFilter } = useSelector((store) => store.user);

  const [filteredList, setFilteredList] = useState(transactionList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredList(transactionList);
    } else {
      setFilteredList(
        transactionList.filter((list) => list.category === activeFilter)
      );
    }
  }, [transactionList, activeFilter]);

  const deleteTransactionEntry = (event, name, amount, category) => {
    const confirmDeleteEntry = window.confirm(
      "Are you sure you want to delete the entry?"
    );

    if (confirmDeleteEntry) {
      dispatch(removeTransactionEntry(event.target.id));
      dispatch(updateTotalExpense({ amount: amount, operation: SUBTRACT }));
      dispatch(
        updateCategoricalExpense({
          amount: amount,
          category: category,
          operation: SUBTRACT,
        })
      );
      toast.success(`Deleted ${name} expense successfully`);
    }
  };

  return (
    <div className="transaction-details-table">
      <table className="transaction-page-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length ? (
            filteredList.map(({ id, name, amount, category }, index) => (
              <tr key={id}>
                <td>{index + 1}. </td>
                <td className="text-capitalize">{name}</td>
                <td className="text-capitalize">{category}</td>
                <td>Rs {amount}</td>
                <td>
                  <button
                    id={id}
                    onClick={(event) =>
                      deleteTransactionEntry(event, name, amount, category)
                    }
                    className="transaction-delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Transactions Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetailsTable;
