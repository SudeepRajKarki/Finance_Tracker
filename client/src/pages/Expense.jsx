import React, { useEffect, useState } from "react";
import { fetchExpense, addExpense, deleteExpense } from '../services/Expenseservice';

const ExpensePage = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpense();
      setExpenses(data);
    } catch (err) {
      console.error(" Failed to load expenses", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      category,
      amount: parseFloat(amount),
      date: date || new Date(),
    };

    try {
      await addExpense(newExpense);
      setCategory("");
      setAmount("");
      setDate("");
      loadExpenses(); 
    } catch (err) {
      console.error("Failed to add expense", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        loadExpenses(); 
      } catch (err) {
        console.error(" Failed to delete expense", err);
      }
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Add Expense
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Expense List</h3>
        {expenses.length === 0 ? (
        <p className="text-gray-500 font-semibold text-xs">No expense record yet.</p>
        ) : (
        <ul className="space-y-2">
        {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map((expense) => (
        <li
        key={expense._id}
        className="p-3 bg-gray-100 rounded shadow flex justify-between items-center"
        >
        <div>
          <p className="font-medium">{expense.category}</p>
          <p className="text-sm text-gray-500">
            {new Date(expense.date).toLocaleDateString()}
          </p>
          <span className="text-red-600 font-bold block mt-1">
            - NPR {expense.amount}
          </span>
        </div>
        <button
          onClick={() => handleDelete(expense._id)}
          className="text-red-600 hover:underline text-sm"
        >
          🗑 Delete
        </button>
      </li>
         ))}
      </ul>
     )}

    </div>
  );
};

export default ExpensePage;
