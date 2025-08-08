import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

function Login() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'https://youtube-backend-0gem.onrender.com/api/login',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setUser(data);
      navigate('/');
    } catch (err) {
      console.error('❌ Login failed:', err.response?.data?.message || err.message);
      alert('Login failed: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign in to YouTube</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="yourname@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <span
            className="text-red-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
