import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PageWrapper from '@/components/layouts/PageWrapper';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

import { useAuth } from '@/authprovider/AuthContext.tsx';
import type { AuthError } from '@supabase/supabase-js';


const Register = () => {
  /* ---------- auth + nav ---------- */
  const { signUp } = useAuth();
  const [inputs, setInputs] = useState({ email: "", password: "", confirmPassword: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // const [message, setMessage] = useState("");

  /* ---------- GNB props (landing style) ---------- */
  const gnbProps = useMemo<GnbProps>(
    () => ({ pageKind: "landing" }),
    []
  );

  /* ---------- submit handler ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    // should handle register logic here
    e.preventDefault();
    // const { data, error } = await supabase.auth.signUp(inputs);

    // if (error) console.log(error.message);

    // setMessage("Check your email for confirmation.");
    if (inputs.password !== inputs.confirmPassword) {
      setSubmitError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await signUp(inputs);
      console.log("User Registered");
    } catch (err: unknown) {
      setSubmitError((err as AuthError).message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <PageWrapper
      gnbProps={gnbProps}
      extraComponents={{ hasFooter: true, hasBottomNavigation: false }}
    >
      <div
        className={clsx(
          "flex flex-1 items-center justify-center",
          "bg-white min-h-[calc(100vh-256px)]"
        )}
      >
        {/* centred card */}
        <div
          className={clsx(
            "flex flex-1 items-center justify-center px-[2.625em]"
          )}
        >
          <div
            className={clsx(
              "w-full max-w-sm rounded-xl bg-blue-600 p-4 shadow-md"
            )}
          >
            <span
              className={clsx(
                "mb-4 block text-center text-[1em] font-semibold text-gray-50"
              )}
            >
              Register
            </span>

            <form
              className={clsx("flex flex-col gap-2")}
              onSubmit={handleSubmit}
            >
              {/* -------- email -------- */}
              <input
                name="email"
                placeholder="Email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                className={clsx(
                  "w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3",
                  "placeholder:text-gray-400 placeholder:text-[1rem]",
                  "text-[1em]",
                  "focus:outline-none focus:ring-1 focus:ring-sky-500"
                )}
              />

              {/* -------- password -------- */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                className={clsx(
                  "w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3",
                  "placeholder:text-gray-400 placeholder:text-[1rem]",
                  "text-[1em]",
                  "focus:outline-none focus:ring-1 focus:ring-sky-500"
                )}
              />

              {/* -------- confirm password -------- */}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                className={clsx(
                  "w-full rounded-lg bg-gray-50 border-1 border-gray-300 px-4 py-3",
                  "placeholder:text-gray-400 placeholder:text-[1rem]",
                  "text-[1em]",
                  "focus:outline-none focus:ring-1 focus:ring-sky-500"
                )}
              />

              {/* -------- submit button -------- */}
              <button
                type="submit"
                disabled={submitting}
                className={clsx(
                  "mt-[1em] w-full w-[12.75em] rounded-lg bg-blue-50 py-2 transition duration-200",
                  "hover:bg-blue-300 disabled:opacity-50"
                )}
              >
                <span
                  className={clsx(
                    "block text-center text-[0.75em] font-bold text-blue-900",
                    "hover:text-white"
                  )}
                >
                  {submitting ? "Registering…" : "Register"}
                </span>
              </button>

              {/* -------- error message -------- */}
              {submitError && (
                <p className={clsx("text-center text-sm text-red-300")}>
                  {submitError}
                </p>
              )}

              {/* -------- link to signin -------- */}
              <span
                className={clsx(
                  "mt-[0.5em] text-center text-[0.75em] font-medium text-gray-50"
                )}
              >
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className={clsx(
                    "font-semibold text-gray-50 hover:underline hover:text-gray-50"
                  )}
                >
                  Login
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Register;
