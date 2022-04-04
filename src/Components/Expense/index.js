import React, { useContext, useState, useEffect } from "react";
import Button from "./../Button";
import Input from "./../Input";
import { ExpenseContext } from "./../../Context/expenseContext";

function ExpenseForm({ closeform }) {
  const [error, seterror] = useState(false);
  const context = useContext(ExpenseContext);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let amount = e.target.elements[0]?.valueAsNumber;
    let date = e.target.elements[1]?.valueAsDate
      ?.toISOString()
      .replace(/T.*/, "");

    let type = e.target.elements[2]?.value;
    if (!type || !date || !amount) return seterror(true);
    context.addExpense({ amount, date, type }).then(() => {
      e.target.reset();
      closeform();
    });
  };
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        seterror(false);
      }, 2000);
    }
  }, [error]);

  return (
    <div>
      {error && <p className="text-red">All fields are mandatory</p>}
      <form onSubmit={handleFormSubmit}>
        <Input
          id="expense"
          label="Expense"
          type="number"
          placeholder="Expense"
        />
        <Input id="date" label="Date" type="date" placeholder="date" />
        <Input
          id="type"
          label="Type"
          type="string"
          placeholder="Expense Type"
        />

        <div>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
