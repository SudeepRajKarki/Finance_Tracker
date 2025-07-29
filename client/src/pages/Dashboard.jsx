import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { fetchIncome } from "../services/Incomeservice";
import { fetchExpense } from '../services/Expenseservice';

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28CFD",
  "#F85C5C",
  "#82ca9d",
  "#8884d8",
];

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch income and expenses once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const incomeData = await fetchIncome();
        const expenseData = await fetchExpense();
        setIncome(incomeData);
        setExpenses(expenseData);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate total income, expenses, balance
  const totalIncome = income.reduce((acc, i) => acc + i.amount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Group income by source for pie chart
  const incomeBySource = income.reduce((acc, i) => {
    acc[i.source] = (acc[i.source] || 0) + i.amount;
    return acc;
  }, {});
  const incomePieData = Object.entries(incomeBySource).map(([name, value]) => ({
    name,
    value,
  }));

  // Group expenses by category for pie chart
  const expenseByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const expensePieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare data for line chart: aggregate by date (yyyy-mm-dd)
  const parseDate = (d) => new Date(d).toISOString().split("T")[0];

  // Helper to group by date and sum amounts
  const aggregateByDate = (arr) => {
    const map = {};
    arr.forEach(({ date, amount }) => {
      const day = parseDate(date);
      map[day] = (map[day] || 0) + amount;
    });
    return map;
  };

  const incomeByDate = aggregateByDate(income);
  const expensesByDate = aggregateByDate(expenses);

  // Get all unique dates from both income and expenses
  const allDates = Array.from(
    new Set([...Object.keys(incomeByDate), ...Object.keys(expensesByDate)])
  ).sort();

  // Build combined line chart data array
  const lineChartData = allDates.map((date) => ({
    date,
    Income: incomeByDate[date] || 0,
    Expense: expensesByDate[date] || 0,
  }));

  // Recent transactions: merge last 5 income and expenses, sort by date desc
  const recentTransactions = [
    ...income.map((i) => ({ ...i, type: "Income" })),
    ...expenses.map((e) => ({ ...e, type: "Expense" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  if (loading) return <p className="text-center mt-20">Loading data...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h2 className="text-4xl font-bold text-center mb-10">📊 Financial Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-green-100 p-6 rounded-xl shadow-lg text-center transition hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-2">Total Income</h3>
          <p className="text-4xl font-bold text-green-700">NPR {totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl shadow-lg text-center transition hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-2">Total Expenses</h3>
          <p className="text-4xl font-bold text-red-700">NPR {totalExpenses.toFixed(2)}</p>
        </div>
        <div
          className={`p-6 rounded-xl shadow-lg text-center transition hover:shadow-xl ${
            balance >= 0 ? "bg-blue-100" : "bg-yellow-100"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">Net Balance</h3>
          <p className={`text-4xl font-bold ${balance >= 0 ? "text-blue-700" : "text-yellow-700"}`}>
            NPR {balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Line Chart: Income & Expense over time */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Income & Expense Trends</h3>
        {lineChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineChartData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="Income"
                stroke="#00C49F"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
              <Line
                type="monotone"
                dataKey="Expense"
                stroke="#FF4C4C"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No data available for trend chart.</p>
        )}
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Income Pie */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">Income by Source</h3>
          {incomePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={incomePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  animationDuration={800}
                >
                  {incomePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No income data available</p>
          )}
        </div>

        {/* Expense Pie */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">Expenses by Category</h3>
          {expensePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={expensePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  animationDuration={800}
                >
                  {expensePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No expense data available</p>
          )}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-center">Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Source / Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Amount (NPR)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className={`${
                      tx.type === "Income" ? "bg-green-50" : "bg-red-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {tx.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tx.type === "Income" ? tx.source : tx.category}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-right font-bold ${
                        tx.type === "Income" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {tx.amount.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
