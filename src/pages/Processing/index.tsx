import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import clsx from "clsx";
import CancelImg from "@/assets/cancel-button.png?as=src";
import LoadingImg from "@/assets/loading-image.png?as=src";
import PageWrapper from "@/components/layouts/PageWrapper";
import {dailyRenalTips} from '@/assets/renalTips.tsx';

const Processing: React.FC = () => {
  const navigate = useNavigate();
  const { status, result } = useAppSelector((state) => state.scan);

  const { title: tipTitle, message: tipText } =
    dailyRenalTips[Math.floor(Math.random() * dailyRenalTips.length)];

  useEffect(() => {
    if (status === "idle" && result) {
      navigate("/result");
    }
  }, [status, result, navigate]);

  return (
    <PageWrapper
      extraComponents={{ hasFooter: false, hasBottomNavigation: false }}
    >
      <div
        className={clsx(
          "flex flex-col flex-1 w-full min-h-[calc(100vh-256px)] items-center justify-center bg-gray-100 px-4",
        )}
      >
        <div className="flex flex-col items-center text-center text-white">
          <span className="mb-2 text-[1.5em] text-gray-900 font-semibold font-bold">
            Getting your meal&apos;s
          </span>
          <span className="mb-8 text-[1.5em] text-gray-900 font-semibold font-bold">
            nutritional breakdown...
          </span>

          <div className="relative mb-8">
            <img
              src={LoadingImg}
              alt="Loading"
              className={clsx(
                "h-auto w-[20em]",
                "text-blue-400",
                "animate-[spin_8s_linear_infinite,pulse_2s_ease-in-out_infinite]",
              )}
            />
          </div>

          <button onClick={() => navigate(-1)}>
            <img
              src={CancelImg}
              alt="Cancel"
              className={clsx("h-auto w-[3.75em]")}
            />
          </button>

          {/* Random renal tip to lighten the wait */}
          <div className="mt-6 w-full max-w-md rounded-lg bg-gray-200 p-4 text-center">
            <p className="mb-2 text-gray-600 text-lg font-semibold">Quick Renal Tip: {tipTitle}</p>
            <p className="text-sm text-gray-700">{tipText}</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Processing;
