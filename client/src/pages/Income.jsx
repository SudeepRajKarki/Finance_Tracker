
import React, { useEffect, useState } from "react";
import { fetchIncome, addIncome, deleteIncome } from '../services/Incomeservice';

const IncomePage = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomes, setIncomes] = useState([]);

  const loadIncomes = async () => {
    try {
      const data = await fetchIncome();
      setIncomes(data);
    } catch (err) {
      console.error("Failed to load incomes", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIncome = {
      source,
      amount: parseFloat(amount),
      date: date || new Date(),
    };

    try {
      await addIncome(newIncome);
      setSource("");
      setAmount("");
      setDate("");
      loadIncomes(); // Refresh the list
    } catch (err) {
      console.error("Failed to add income", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await deleteIncome(id);
        loadIncomes(); // Refresh the list
      } catch (err) {
        console.error(" Failed to delete income", err);
      }
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">💰 Add Income</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Add Income
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">📋 Income List</h3>
      {incomes.length === 0 ? (
        <p className="text-gray-500 font-semibold text-xs">No income record yet.</p>
        ) : (
      <ul className="space-y-2">
        {incomes.sort((a, b) => new Date(b.date) - new Date(a.date)) // latest date first
          .map((income)  => (
          <li
            key={income._id}
            className="p-3 bg-gray-100 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{income.source}</p>
              <p className="text-sm text-gray-500">{new Date(income.date).toLocaleDateString()}</p>
              <span className="text-green-600 font-bold block mt-1">+ NPR {income.amount}</span>
            </div>
            <button
              onClick={() => handleDelete(income._id)}
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

export default IncomePage;
