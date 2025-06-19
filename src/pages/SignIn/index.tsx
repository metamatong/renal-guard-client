import {useState, useMemo, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
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
  const gnbProps = useMemo<GnbProps>(
    () => ({pageKind: 'landing'}),
    [auth.user]
  );

  /* ---------- submit handler ---------- */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(inputs))
      .unwrap()
      .then(() => navigate('/'))
      // error is already handled in the slice; nothing to do here
      .catch(() => {
      });
  };

  /* ---------- render ---------- */
  return (
    <PageWrapper
      gnbProps={gnbProps}
      extraComponents={{hasFooter: true, hasBottomNavigation: false}}
    >
      <div className='flex flex-1 items-center justify-center bg-white min-h-[calc(100vh-256px)]'>
        {/* centred card, same styling as before */}
        <div className='flex flex-1 items-center justify-center px-[2.625em]'>
          <div className='w-full max-w-sm rounded-xl bg-blue-600 p-4 shadow-md'>
          <span className='mb-4 block text-center text-[1em] font-semibold text-gray-50'>
            Login
          </span>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <input
                name='email'
                placeholder='Email'
                value={inputs.email}
                onChange={(e) =>
                  setInputs({...inputs, email: e.target.value})
                }
                className='w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3
                  placeholder:text-gray-400 placeholder:text-[0.75rem]
                  text-[0.75em]
                  focus:outline-none focus:ring-1 focus:ring-sky-500'
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={inputs.password}
                onChange={(e) =>
                  setInputs({...inputs, password: e.target.value})
                }
                className='w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3
                                placeholder:text-gray-400 placeholder:text-[0.75rem]
                                text-[0.75em]
                                focus:outline-none focus:ring-1 focus:ring-sky-500'
              />

              <button
                type='submit'
                disabled={status === 'loading'}
                className='w-[12.75em] mt-[1em] rounded-lg bg-blue-50 py-2
                transition duration-200
                w-full
                hover:bg-blue-300 disabled:opacity-50'
              >
              <span className='block text-center text-[0.75em] font-bold text-blue-900 hover:text-white'>
                {status === 'loading' ? 'Logging in…' : 'Login'}
              </span>
              </button>

              {status === 'error' && (
                <p className='text-center text-sm text-red-500'>{error}</p>
              )}

              <span className='text-center mt-[0.5em] font-medium text-[0.75em] text-gray-50'>
              No account?{' '}
                <Link
                  to='/register'
                  className='font-semibold text-gray-50 hover:underline hover:text-gray-50'
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