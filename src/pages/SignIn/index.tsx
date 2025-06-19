import {useState, useMemo, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import clsx from 'clsx';

import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {loginThunk} from '@/store/authSlice';
import PageWrapper from '@/components/layouts/PageWrapper';
import type {RootState} from '@/store';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';


const SignIn = () => {
  /* ---------- auth + nav ---------- */
  const [inputs, setInputs] = useState({email: '', password: ''});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {status, error} = useAppSelector((s) => s.auth);

  /* ---------- GNB props (landing style) ---------- */
  const auth = useSelector((state: RootState) => state.auth);
  const gnbProps = useMemo<GnbProps>(() => ({pageKind: 'landing'}), [auth.user]);

  /* ---------- submit handler ---------- */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(inputs))
      .unwrap()
      .then(() => navigate('/'))
      .catch(() => {
      }); // error already handled in slice
  };

  /* ---------- render ---------- */
  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{hasFooter: true, hasBottomNavigation: false}}>
      <div
        className={clsx(
          'flex flex-1 items-center justify-center',
          'bg-white min-h-[calc(100vh-256px)]'
        )}
      >
        {/* centred card */}
        <div className={clsx('flex flex-1 items-center justify-center px-[2.625em]')}>
          <div className={clsx('w-full max-w-sm rounded-xl bg-blue-600 p-4 shadow-md')}>
            <span className={clsx('mb-4 block text-center text-[1em] font-semibold text-gray-50')}>
              Login
            </span>

            <form className={clsx('flex flex-col gap-2')} onSubmit={handleSubmit}>
              {/* -------- email -------- */}
              <input
                name='email'
                placeholder='Email'
                value={inputs.email}
                onChange={(e) => setInputs({...inputs, email: e.target.value})}
                className={clsx(
                  'w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3',
                  'placeholder:text-gray-400 placeholder:text-[0.75rem]',
                  'text-[0.75em]',
                  'focus:outline-none focus:ring-1 focus:ring-sky-500'
                )}
              />

              {/* -------- password -------- */}
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password: e.target.value})}
                className={clsx(
                  'w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3',
                  'placeholder:text-gray-400 placeholder:text-[0.75rem]',
                  'text-[0.75em]',
                  'focus:outline-none focus:ring-1 focus:ring-sky-500'
                )}
              />

              {/* -------- submit button -------- */}
              <button
                type='submit'
                disabled={status === 'loading'}
                className={clsx(
                  'mt-[1em] w-full w-[12.75em] rounded-lg bg-blue-50 py-2 transition duration-200',
                  'hover:bg-blue-300 disabled:opacity-50'
                )}
              >
                <span
                  className={clsx(
                    'block text-center text-[0.75em] font-bold text-blue-900',
                    'hover:text-white'
                  )}
                >
                  {status === 'loading' ? 'Logging in…' : 'Login'}
                </span>
              </button>

              {/* -------- error message -------- */}
              {status === 'error' && (
                <p className={clsx('text-center text-sm text-red-500')}>{error}</p>
              )}

              {/* -------- link to register -------- */}
              <span className={clsx('mt-[0.5em] text-center text-[0.75em] font-medium text-gray-50')}>
                No account?{' '}
                <Link
                  to='/register'
                  className={clsx('font-semibold text-gray-50 hover:underline hover:text-gray-50')}
                >
                  Register
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignIn;