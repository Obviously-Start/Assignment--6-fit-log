/*"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { getWorkouts } from "../data/api";
import type { Workout } from "../types/workout";
import WorkoutCard from "./WorkoutCard";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkouts();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
   <section
  id="library"
 className="bg-[#0a0a0b] px-4 pt-12 pb-16 sm:pt-16 sm:pb-20"
>
      <div className="container-fitlog">
        {/* Section Header }
        <div className="mb-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7d900]">
            WORKOUTS
          </p>

          <h2 className="font-display mt-2 text-5xl font-bold uppercase leading-none text-[#f1f2f3] sm:text-6xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-[#85878d]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading State }
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-[#85878d]">
              <LoaderCircle
                size={20}
                className="animate-spin text-[#b7d900]"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                Loading workouts...
              </span>
            </div>
          </div>
        )}

        {/* Error State }
        {!loading && error && (
          <div className="border border-red-500/30 bg-red-500/5 px-5 py-6 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Workout Grid }
        {!loading && !error && workouts.length > 0 && (
         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}

        {/* Empty State }
        {!loading && !error && workouts.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center border border-[#292c32] bg-[#17181c]">
            <p className="text-sm text-[#85878d]">
              No workouts found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}*/