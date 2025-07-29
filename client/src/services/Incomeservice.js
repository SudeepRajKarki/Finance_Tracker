import API from '../api';

export const fetchIncome = async () => {
  const res = await API.get('/income');
  return res.data;
};

export const addIncome = async (incomeData) => {
  const res = await API.post('/income', incomeData);
  return res.data;
};

export const deleteIncome = async (id) => {
  const res = await API.delete(`/income/${id}`);
  return res.data;
};