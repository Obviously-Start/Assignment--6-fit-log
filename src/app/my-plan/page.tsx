"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  CheckCircle2,
  Clock3,
  Flame,
  LoaderCircle,
  Star,
  Trash2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const {
    planItems,
    savedWorkouts,
    toggleDone,
    removeFromPlan,
    toggleSaved,
    addToPlan,
    isInPlan,
    isPlanFull,
  } = usePlan();

 

  const totalMinutes = planItems.reduce(
    (sum, item) => sum + item.workout.duration,
    0
  );

  const totalCalories = planItems.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );

  

  const sortedPlanItems = useMemo(() => {
    const items = [...planItems];

    items.sort((a, b) => {
      if (sortBy === "duration") {
        return b.workout.duration - a.workout.duration;
      }

      if (sortBy === "calories") {
        return b.workout.caloriesBurned - a.workout.caloriesBurned;
      }

      return b.workout.rating - a.workout.rating;
    });

    return items;
  }, [planItems, sortBy]);

  

  const sortedSavedWorkouts = useMemo(() => {
    const workouts = [...savedWorkouts];

    workouts.sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });

    return workouts;
  }, [savedWorkouts, sortBy]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#111316]">
        <div className="container-fitlog py-12 sm:py-14">
          
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ccff00]">
              FITLOG
            </p>

            <h1 className="font-display mt-3 text-5xl font-bold uppercase leading-none text-white sm:text-6xl">
              MY PLAN
            </h1>

            <p className="mt-3 text-[11px] leading-5 text-[#85878d]">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          
          <div className="mt-8 grid overflow-hidden rounded-[10px] border border-[#292d33] bg-[#15171b] md:grid-cols-3">
            
            <div className="border-b border-[#24272d] px-5 py-5 md:border-b-0 md:border-r">
              <p className="text-[9px] font-medium text-[#777b83]">
                Exercises
              </p>

              <p className="font-display mt-1 text-3xl font-bold leading-none text-[#ccff00]">
                {planItems.length}
              </p>
            </div>

           
            <div className="border-b border-[#24272d] px-5 py-5 md:border-b-0 md:border-r">
              <p className="text-[9px] font-medium text-[#777b83]">
                Minutes
              </p>

              <p className="font-display mt-1 text-3xl font-bold leading-none text-white">
                {totalMinutes}
              </p>
            </div>

            
            <div className="px-5 py-5">
              <p className="text-[9px] font-medium text-[#777b83]">
                Calories
              </p>

              <p className="font-display mt-1 text-3xl font-bold leading-none text-white">
                {totalCalories}
              </p>
            </div>
          </div>

          
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            
            <div className="flex w-fit rounded-[8px] border border-[#292d33] bg-[#15171b] p-0.5">
              <button
                type="button"
                onClick={() => setTab("plan")}
                className={`rounded-[6px] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] transition ${
                  tab === "plan"
                    ? "bg-[#24272d] text-[#f1f2f3]"
                    : "text-[#777b83] hover:text-white"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setTab("saved")}
                className={`rounded-[6px] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] transition ${
                  tab === "saved"
                    ? "bg-[#24272d] text-[#f1f2f3]"
                    : "text-[#777b83] hover:text-white"
                }`}
              >
                Saved
              </button>
            </div>

        
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-workouts"
                className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#777b83]"
              >
                Sort By
              </label>

              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="cursor-pointer rounded-[7px] border border-[#292d33] bg-[#15171b] px-3 py-2 text-[10px] text-[#d7d9dc] outline-none transition hover:border-[#4a4f57] focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

         
          {loading && (
            <div className="mt-5 flex min-h-[220px] items-center justify-center">
              <div className="flex items-center gap-3 text-[#777b83]">
                <LoaderCircle
                  size={20}
                  className="animate-spin text-[#ccff00]"
                />

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  Loading workouts...
                </span>
              </div>
            </div>
          )}

         
          {!loading && tab === "plan" && (
            <div className="mt-5">
              {sortedPlanItems.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-3">
                  {sortedPlanItems.map(({ workout, done }) => (
                    <div
                      key={workout.id}
                      className="flex items-center gap-3 rounded-[9px] border border-[#292d33] bg-[#15171b] p-3 transition-colors hover:border-[#383d45] sm:gap-4 sm:p-4"
                    >
                      
                      <Link
                        href={`/workout/${workout.id}`}
                        className="h-14 w-20 shrink-0 overflow-hidden rounded-[6px] bg-[#1b1e23] sm:h-16 sm:w-24"
                      >
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                     
                      <div className="min-w-0 flex-1">
                        <Link href={`/workout/${workout.id}`}>
                          <h3 className="font-display truncate text-base font-bold uppercase text-white transition hover:text-[#ccff00] sm:text-lg">
                            {workout.name}
                          </h3>
                        </Link>

                        <p className="mt-0.5 truncate text-[9px] text-[#777b83]">
                          {workout.equipment}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[9px] text-[#777b83]">
                        
                          <span className="flex items-center gap-1">
                            <Clock3
                              size={10}
                              className="text-[#ccff00]"
                            />
                            {workout.duration} min
                          </span>

                          
                          <span className="flex items-center gap-1">
                            <Flame
                              size={10}
                              className="text-[#ccff00]"
                            />
                            {workout.caloriesBurned} kcal
                          </span>

                          
                          <span className="flex items-center gap-1">
                            <Star
                              size={10}
                              className="fill-[#ccff00] text-[#ccff00]"
                            />
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                   
                      <div className="flex shrink-0 items-center gap-2">
                   
                        <Link
                          href={`/workout/${workout.id}`}
                          className="hidden rounded-full border border-[#343940] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-[#d7d9dc] transition hover:border-[#ccff00] hover:text-[#ccff00] sm:inline-flex"
                        >
                          View Details
                        </Link>

                        
                        <button
                          type="button"
                          onClick={() => toggleDone(workout.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.03em] transition ${
                            done
                              ? "bg-[#ccff00] text-[#111111]"
                              : "bg-[#ccff00] text-[#111111] hover:bg-[#a8d600]"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <Check size={12} />
                          )}

                          <span>
                            {done ? "Done" : "Mark as Done"}
                          </span>
                        </button>

                      
                        <button
                          type="button"
                          onClick={() => removeFromPlan(workout.id)}
                          aria-label="Remove from plan"
                          className="shrink-0 p-1 text-[#55585e] transition hover:text-[#ff4d4d]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
          {!loading && tab === "saved" && (
            <div className="mt-5">
              {sortedSavedWorkouts.length === 0 ? (
                <EmptyState label="Nothing saved yet" />
              ) : (
                <div className="flex flex-col gap-3">
                  {sortedSavedWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center gap-3 rounded-[9px] border border-[#292d33] bg-[#15171b] p-3 transition-colors hover:border-[#383d45] sm:gap-4 sm:p-4"
                    >
                     
                      <Link
                        href={`/workout/${workout.id}`}
                        className="h-14 w-20 shrink-0 overflow-hidden rounded-[6px] bg-[#1b1e23] sm:h-16 sm:w-24"
                      >
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                   
                      <div className="min-w-0 flex-1">
                        <Link href={`/workout/${workout.id}`}>
                          <h3 className="font-display truncate text-base font-bold uppercase text-white transition hover:text-[#ccff00] sm:text-lg">
                            {workout.name}
                          </h3>
                        </Link>

                        <p className="mt-0.5 truncate text-[9px] text-[#777b83]">
                          {workout.equipment}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[9px] text-[#777b83]">
                          <span className="flex items-center gap-1">
                            <Clock3
                              size={10}
                              className="text-[#ccff00]"
                            />
                            {workout.duration} min
                          </span>

                          <span className="flex items-center gap-1">
                            <Flame
                              size={10}
                              className="text-[#ccff00]"
                            />
                            {workout.caloriesBurned} kcal
                          </span>

                          <span className="flex items-center gap-1">
                            <Star
                              size={10}
                              className="fill-[#ccff00] text-[#ccff00]"
                            />
                            {workout.rating}
                          </span>
                        </div>
                      </div>

                      
                      <div className="flex shrink-0 items-center gap-2">
                      
                        <Link
                          href={`/workout/${workout.id}`}
                          className="hidden rounded-full border border-[#343940] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-[#d7d9dc] transition hover:border-[#ccff00] hover:text-[#ccff00] sm:inline-flex"
                        >
                          View Details
                        </Link>

                        
                        <button
                          type="button"
                          onClick={() => addToPlan(workout)}
                          disabled={isInPlan(workout.id) || isPlanFull()}
                          className={`rounded-full px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.03em] transition ${
                            isInPlan(workout.id) || isPlanFull()
                              ? "cursor-default bg-[#24272d] text-[#55585e]"
                              : "bg-[#ccff00] text-[#111111] hover:bg-[#a8d600]"
                          }`}
                        >
                          {isInPlan(workout.id)
                            ? "In Plan"
                            : isPlanFull()
                              ? "Plan Full"
                              : "Add to Plan"}
                        </button>

                        
                        <button
                          type="button"
                          onClick={() => toggleSaved(workout)}
                          aria-label="Remove from saved"
                          className="shrink-0 p-1 text-[#55585e] transition hover:text-[#ff4d4d]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}



function EmptyState({
  label = "Nothing here yet",
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#292d33] bg-[#101214] px-5 py-16 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.1em] text-[#d7d9dc]">
        {label}
      </p>

      <p className="mt-1 text-[9px] text-[#777b83]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/#library"
        className="fitlog-button mt-4 rounded-full px-5 py-2.5 text-[9px] font-extrabold uppercase tracking-[0.08em] transition-transform duration-200 hover:-translate-y-0.5"
      >
        Go to workouts
      </Link>
    </div>
  );
}