import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h3 className='text-2xl font-bold text-center'>Welcome Back!</h3>
    <p className='text-xs text-center mb-4'>Please Login to Continue</p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Login
      </button>
      <p className="text-center text-sm">
        No Account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Register Now
        </a>
      </p>
    </form>
  </div>
</div>

  );
};

export default Login;
