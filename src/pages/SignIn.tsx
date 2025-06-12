import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add Firebase or other auth logic here
    console.log('Signing in with:', { email, password });
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // On successful sign-in:
    navigate('/dashboard');
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <ShieldCheck className="w-16 h-16 text-blue-400 mx-auto mb-2" />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your dashboard.</p>
        </div>

        <form onSubmit={handleSignIn} className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-white border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-white border-gray-600 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <button onClick={handleNavigateToRegister} className="font-bold text-blue-400 hover:text-blue-300">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
