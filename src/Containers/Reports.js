import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { classes } from "./../Components/Login/index";
import { ExpenseContext } from "./../Context/expenseContext";
import Table from "./../Components/Table";
import PieComponent from "../Components/Charts/Pie";
import { groupByExpense } from "../utils";
import RenderBarChart from "./../Components/Charts/Bar";

function Reports() {
  const [error, seterror] = useState(false);
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const { expenses } = useContext(ExpenseContext);

  useEffect(() => {
    setData(expenses);
    let Data = groupByExpense(expenses, "date");
    setBarData(Object.values(Data));
  }, [expenses]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let date1 = e.target.elements[0]?.valueAsDate;
    let date2 = e.target.elements[1]?.valueAsDate;
    if (!date1 || !date2) return seterror(true);
    let filtered = expenses.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getTime() >= date1.getTime() && date.getTime() <= date2.getTime()
      );
    });
    let group = groupByExpense(filtered, "expenseType");
    let Data = groupByExpense(filtered, "date");
    setBarData(Object.values(Data));
    setPieData(Object.values(group));
    setData(filtered);
  };
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between">
        <h3 className="text-green">Expense Management</h3>
        <div className="text-black border-1 border-black">
          <Link to="/">Expenses</Link>
        </div>
      </div>

      <form onSubmit={handleFormSubmit}>
        {error && <p>All fields are mandatory</p>}
        <div className="flex justify-around">
          <Input id="from" label="From" type="date" />
          <Input id="to" label="To" type="date" />
          <div className={classes.btnContainer}>
            <Button type="submit">Get Data</Button>
          </div>
        </div>
      </form>
      <Table headings={["date", "expense", "Type"]} data={data || []} />
      <div className="flex justify-around">
        <PieComponent data={pieData} />
        <RenderBarChart data={barData} />
      </div>
    </div>
  );
}

export default Reports;
