import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
     <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'email', 'password'].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
        <p className='text-center text-sm'>Already Registered User! <a href='/login' className="text-blue-500 hover:underline" >Login Here</a></p>
      </form>
      </div>
      </div>
  );
};

export default Register;