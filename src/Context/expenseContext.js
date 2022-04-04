import React, { useState } from "react";
import { axiosInstance } from "./../utils/axios";

export const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  getExpense: () => {},
});

const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpense] = useState(null);

  const getData = async () => {
    let res = await axiosInstance.get("/");

    setExpense(
      res.data.Items.map((data) => {
        return {
          expenseId: data.expenseId.N,
          date: data.date.S,
          expense: data.expense.N,
          expenseType: data.expenseType.S,
        };
      })
    );
  };

  const addExpense = async (data) => {
    try {
      let lastId =
        expenses.length > 0 ? expenses[expenses.length - 1].expenseId : 1;
      data["id"] = Number(lastId) + 1;
      await axiosInstance.put("/", JSON.stringify(data));
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const getExpense = () => {
    getData();
  };

  const deleteExpense = async (data) => {
    await axiosInstance.delete("/", {
      data: { expenseId: `${Number(data.expenseId)}` },
    });
  };

  return (
    <ExpenseContext.Provider
      value={{ addExpense, getExpense, expenses, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
