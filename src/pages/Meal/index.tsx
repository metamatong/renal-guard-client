import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MealImg from "@/assets/meal-photo.png?as=src";
import PageWrapper from "@/components/layouts/PageWrapper";
import type { GnbProps } from "@/components/layouts/GlobalNavigationBar";
import clsx from "clsx";
import { useAuth } from "@/authprovider/AuthContext.tsx";


const MealList: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  /** Entire meal history for the selected day (or all available rows). */
  const [meals, setMeals] = useState<
    Array<{ id: number; created_at: string; content: string }>
  >([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (loading || !user) return;

    (async () => {
      try {
        // Using the Unix epoch as timestamp returns *all* rows on the backend
        // (adjust if your API later supports arbitrary ranges).
        const ts = new Date(0).toISOString();
        const resp = await fetch(
          `${import.meta.env.VITE_AWS_HISTORY_ENDPOINT}?uid=${user.id}&timestamp=${ts}`
        );
        const json = await resp.json();
        setMeals(Array.isArray(json.results) ? json.results : []);
      } catch (err) {
        console.error("[MealList] fetch failed", err);
      }
    })();
  }, [loading, user]);

  const gnbProps = useMemo<GnbProps>(() => ({ pageKind: "nested" }), []);

  if (loading || !user) return null;

  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{ hasFooter: false, hasBottomNavigation: true }}>
      <div className="p-4 bg-gray-100 text-white min-h-screen">
        {meals.length === 0 ? (
          <p className="text-center text-gray-500 mt-[5em]">No meals found.</p>
        ) : (
          <main className="space-y-6">
            {meals.map((meal) => {
              /* Extract fields for card */
              const [datePart, timePart] = new Date(meal.created_at)
                .toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: false })
                .split(" ");

              return (
                <section key={meal.id} className="rounded-lg bg-gray-200 p-4">
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <img src={MealImg} alt="Meal" className="w-[2.25em] h-[2.25em]" />
                    <div>
                      <p className="font-semibold text-gray-950">Meal {meal.id}</p>
                      <p className="text-sm text-gray-400">{timePart ?? datePart}</p>
                    </div>
                  </div>

                  {/* Nutritional chips */}
                  <div className="mt-[0.625em] rounded-lg bg-white p-4">
                    <p className="mb-2 font-semibold text-gray-950">Estimated Nutritional Content</p>

                    <div className="flex flex-wrap gap-2">
                      {meal.content
                        .split("\n")
                        .filter(Boolean)
                        .map((line) => {
                          const [rawName, rawRest] = line.split(",");
                          const name = rawName.trim().replace(/^./, (c) => c.toUpperCase());
                          const [value, unit] = rawRest.trim().split(/\s+/);

                          if (name === "Calories") {
                            return (
                              <div
                                key={name}
                                className="flex items-center rounded-full border-2 border-blue-950 px-3 py-1 text-sm font-semibold text-blue-950"
                              >
                                {value}&nbsp;{unit}
                              </div>
                            );
                          }

                          const colors: Record<
                            string,
                            { symbol: string; bg: string; text: string }
                          > = {
                            sodium: { symbol: "Na", bg: "bg-gray-200", text: "text-gray-700" },
                            potassium: { symbol: "K", bg: "bg-[#FEC77B]", text: "text-[#FD6428]" },
                            phosphorus: {
                              symbol: "PO₄",
                              bg: "bg-[#C8A6F1]",
                              text: "text-[#2F12A4]",
                            },
                            water: { symbol: "H₂O", bg: "bg-[#C4DDFF]", text: "text-[#2875DA]" },
                            protein: { symbol: "Protein", bg: "bg-[#E39F96]", text: "text-[#7E352C]" },
                          };

                          const key = name.toLowerCase() as keyof typeof colors;
                          const { symbol, bg, text } = colors[key] ?? colors.sodium;

                          return (
                            <div
                              key={name}
                              className={clsx(
                                "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold",
                                bg,
                                "text-white"
                              )}
                            >
                              <span className={text}>{symbol}</span>
                              <span className={text}>
                                {value}
                                <span className="text-[1em] font-medium">{unit}</span>
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </section>
              );
            })}
          </main>
        )}
      </div>
    </PageWrapper>
  );
};

export default MealList;
