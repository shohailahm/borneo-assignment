import React, { useEffect, useState, useContext } from "react";
import Table from "../Components/Table";
import ExpenseForm from "./../Components/Expense/index";
import Modal from "../Components/Modal";
import Button from "../Components/Button";
import { ExpenseContext } from "./../Context/expenseContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const context = useContext(ExpenseContext);
  useEffect(() => {
    context.getExpense();
  }, [context]);

  const deleteRow = (data) => {
    context.deleteExpense(data).then(() => {
      context.getExpense();
    });
  };
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between">
        <h3 className="text-green">Expense Management</h3>
        <div className="text-black border-1 border-black">
          <Link to="/reports">Reports</Link>
        </div>
      </div>
      <Button
        className="mt-2 mb-2 p-2 border-1 rounded text-white bg-green"
        onClick={() => setShowModal(true)}
      >
        Add Expense
      </Button>
      {showModal && (
        <div className="w-1/2">
          <Modal closeModal={() => setShowModal(false)}>
            <div className="w-1/2 lg:w-3/12">
              <ExpenseForm closeform={() => setShowModal(false)} />
            </div>
          </Modal>
        </div>
      )}

      <Table
        headings={["date", "expense", "Type"]}
        data={context.expenses || []}
        hasAction
        actionCb={deleteRow}
      />
    </div>
  );
}
