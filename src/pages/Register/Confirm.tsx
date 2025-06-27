import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PageWrapper from '@/components/layouts/PageWrapper';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

import { useAuth } from '@/authprovider/AuthContext.tsx';
import type { AuthError } from '@supabase/supabase-js';


const Confirm = () => {
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
          "flex flex-1 flex-col items-center justify-start pt-[9em]",
          "bg-white px-[3.75em] min-h-[calc(100vh-256px)]"
        )}
      >

        <span className='mb-8 text-[1.5em] font-semibold'>
          Check your inbox, < br/>
          verify your email, < br/>
          then log in.
        </span>

        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            "mt-[2em] w-full w-[12.75em] rounded-lg bg-blue-50 py-2 transition duration-200",
            "hover:bg-blue-300 disabled:opacity-50"
          )}
        >
            <span
              className={clsx(
                "block text-center text-[1em] font-bold text-blue-900",
                "hover:text-white"
              )}
            >
              {submitting ? "Navigating…" : "Back to Log In"}
            </span>
        </button>
      </div>
    </PageWrapper>
  );
};

export default Confirm;
