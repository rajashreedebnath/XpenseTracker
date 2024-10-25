import React from "react";
import TransactionFilters from "./TransactionFilters";
import TransactionDetailsTable from "./TransactionDetailsTable";
import "./TransactionTable.css";

const TransactionTable = () => {
  return (
    <div className="transactions">
      <TransactionFilters />
      <hr />
      <TransactionDetailsTable />
    </div>
  );
};

export default TransactionTable;
