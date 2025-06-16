import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/store/authSlice';
import type { FormEvent } from 'react';

const SignIn = () => {
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error } = useAppSelector((s) => s.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(inputs))
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => {/* error handled in slice */});
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-700">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={(e) =>
              setInputs({ ...inputs, username: e.target.value })
            }
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setInputs({ ...inputs, password: e.target.value })
            }
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-indigo-500 py-2 text-white transition duration-200 hover:bg-indigo-600 disabled:opacity-50"
          >
            {status === 'loading' ? 'Logging in…' : 'Login'}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm text-red-500">{error}</p>
          )}

          <span className="text-center text-sm text-gray-600">
            No account?{' '}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;