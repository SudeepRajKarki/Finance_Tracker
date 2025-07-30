import API from '../api';

export const fetchExpense = async () => {
  const res = await API.get('/expense');
  return res.data;
};

export const addExpense = async (expenseData) => {
  const res = await API.post('/expense', expenseData);
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await API.delete(`/expense/${id}`);
  return res.data;
};
