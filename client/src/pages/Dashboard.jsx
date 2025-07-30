import React, { useEffect, useState } from "react";
import {
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
// --- Import React Icons ---
import { FaShoppingCart, FaPlane, FaUtensils, FaMoneyBillWave, FaEllipsisH } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"; // Import Up Arrow Icon

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

// --- Icon Mapping ---
const getTransactionIcon = (type, sourceOrCategory) => {
  if (type === "Income") {
    return <GiReceiveMoney className="text-green-500 text-xl" />;
  }

  // Map common expense categories to icons
  switch (sourceOrCategory?.toLowerCase()) {
    case "shopping":
      return <FaShoppingCart className="text-purple-500 text-xl" />;
    case "travel":
      return <FaPlane className="text-blue-500 text-xl" />;
    case "food":
      return <FaUtensils className="text-red-500 text-xl" />;
    default:
      return <FaEllipsisH className="text-gray-500 text-xl" />; // Default icon
  }
};

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  // State to control the number of transactions displayed
  const [showAllTransactions, setShowAllTransactions] = useState(false);

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

  // Recent transactions: merge ALL income and expenses, sort by date desc
  const allRecentTransactions = [
    ...income.map((i) => ({ ...i, type: "Income" })),
    ...expenses.map((e) => ({ ...e, type: "Expense" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Determine which transactions to display based on the toggle state
  const displayedTransactions = showAllTransactions
    ? allRecentTransactions
    : allRecentTransactions.slice(0, 5); // Show top 5 by default

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

      {/* --- Updated Recent Transactions Section with Toggle --- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Recent Transactions</h3>
          {/* Toggle Button */}
          <button
            onClick={() => setShowAllTransactions(!showAllTransactions)}
            className="text-sm font-medium text-blue-500 hover:underline flex items-center"
          >
            {showAllTransactions ? (
              <>
                See Less <MdArrowDropUp className="ml-1 text-lg" />
              </>
            ) : (
              <>
                See All <MdArrowDropDown className="ml-1 text-lg" />
              </>
            )}
          </button>
        </div>

        {displayedTransactions.length > 0 ? (
          <ul className="space-y-4">
            {displayedTransactions.map((tx) => (
              <li
                key={tx._id}
                className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {getTransactionIcon(tx.type, tx.type === "Income" ? tx.source : tx.category)}
                  </div>
                  {/* Transaction Details */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {tx.type === "Income" ? tx.source : tx.category}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.date).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <p
                  className={`text-sm font-bold ${tx.type === "Income" ? "text-green-600" : "text-red-600"}`}
                >
                  {tx.type === "Income" ? "+" : "-"} NPR {Number(tx.amount).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">No recent transactions found.</p>
        )}
      </div>
      {/* --- End of Updated Recent Transactions Section --- */}

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
    </div>
  );
};

export default Dashboard;