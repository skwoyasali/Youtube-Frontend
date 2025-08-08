import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    avatar: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    let avatar = form.avatar.trim();

    if (!username || !email || !password) {
      alert('Please fill in all required fields without empty spaces.');
      return;
    }

    if (!avatar) {
      const initial = username.charAt(0).toUpperCase();
      avatar = `https://placehold.co/40x40.png?text=${initial}`;
    }

    try {
      const { data } = await axios.post(
        'https://youtube-backend-0gem.onrender.com/api/register',
        { username, email, avatar, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ User registered successfully, please login.');
      navigate('/Youtube-Frontend/login');
    } catch (err) {
      console.error('❌ Registration failed:', err.response?.data?.message || err.message);
      alert('Registration failed: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create your YouTube account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar URL (optional)
            </label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              placeholder="https://example.com/avatar.png"
              value={form.avatar}
              onChange={handleChange}
              autoComplete="photo"
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
              autoComplete="new-password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 font-semibold"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <span
            className="text-red-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/Youtube-Frontend/login')}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
