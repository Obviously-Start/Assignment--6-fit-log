"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CalendarPlus,
  Clock3,
  Flame,
  LoaderCircle,
  Star,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { getWorkoutById } from "../../data/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "../../types/workout";

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    isInPlan,
    isSaved,
    addToPlan,
    removeFromPlan,
    toggleSaved,
  } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkout = async () => {
      try {
        setLoading(true);
        setError("");

        const id = Number(params.id);

        if (Number.isNaN(id)) {
          setError("Workout not found.");
          return;
        }

        const data = await getWorkoutById(id);

        if (!data) {
          setError("Workout not found.");
          return;
        }

        setWorkout(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this workout. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkout();
  }, [params.id]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0f1114]">
        <div className="container-fitlog py-8 sm:py-10">
          
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-7 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#777b83] transition-colors duration-200 hover:text-[#ccff00]"
          >
            <ArrowLeft size={14} />
            <span>Back to Library</span>
          </button>

          
          {loading && (
            <div className="flex min-h-[450px] items-center justify-center">
              <div className="flex items-center gap-3 text-[#777b83]">
                <LoaderCircle
                  size={20}
                  className="animate-spin text-[#ccff00]"
                />

                <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                  Loading workout...
                </span>
              </div>
            </div>
          )}

          
          {!loading && error && (
            <div className="border border-red-500/30 bg-red-500/5 px-5 py-6 text-sm text-red-400">
              {error}
            </div>
          )}

          
          {!loading && !error && workout && (
            <div className="grid items-start gap-9 lg:grid-cols-[0.95fr_1.05fr]">
             
              <div className="h-[468px] overflow-hidden rounded-[10px] border border-[#292d33] bg-[#17191d]">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-full w-full object-cover"
                />
              </div>

          
              <div>
             
                <div>
                  
                  <h1 className="font-display text-[32px] font-bold uppercase leading-none tracking-tight text-white sm:text-[36px]">
                    {workout.name}
                  </h1>

                 
                  <p className="mt-2 max-w-[620px] text-[11px] leading-[1.5] text-[#858a91] sm:text-xs">
                    {workout.description}
                  </p>

              
                  <div className="mt-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#c6ff00] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.04em] text-[#101214]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                 
                  <div className="mt-4 overflow-hidden rounded-[10px] border border-[#292d33] bg-[#15171b]">
                    
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                        Equipment
                      </span>

                      <span className="text-[10px] font-semibold text-[#e4e6e8]">
                        {workout.equipment}
                      </span>
                    </div>

                   
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                        Difficulty
                      </span>

                      <span className="text-[10px] font-semibold text-[#e4e6e8]">
                        {workout.difficulty}
                      </span>
                    </div>

                   
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                        Sets
                      </span>

                      <span className="text-[10px] font-bold text-white">
                        {workout.sets}
                      </span>
                    </div>

                
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                        Reps
                      </span>

                      <span className="text-[10px] font-bold text-white">
                        {workout.reps}
                      </span>
                    </div>

                    
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <div className="flex items-center gap-2.5">
                        <Clock3
                          size={12}
                          className="text-[#c6ff00]"
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                          Duration
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-white">
                        {workout.duration} min
                      </span>
                    </div>

                    
                    <div className="flex h-[44px] items-center justify-between border-b border-[#25292f] px-4">
                      <div className="flex items-center gap-2.5">
                        <Flame
                          size={12}
                          className="text-[#c6ff00]"
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                          Calories
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-white">
                        {workout.caloriesBurned} kcal
                      </span>
                    </div>

                    
                    <div className="flex h-[44px] items-center justify-between px-4">
                      <div className="flex items-center gap-2.5">
                        <Star
                          size={12}
                          className="fill-[#c6ff00] text-[#c6ff00]"
                        />

                        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-[#70757d]">
                          Rating
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-white">
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                 
                  <div className="mt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      Instructions
                    </p>

                    <ol className="mt-3 space-y-2">
                      {workout.instructions.map((step, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-4"
                        >
                          <span className="w-3 shrink-0 pt-[1px] text-[8px] font-semibold text-[#777c84]">
                            {index + 1}
                          </span>

                          <p className="text-[9px] leading-[1.45] text-[#858a91] sm:text-[10px]">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

              
                <div className="mt-5 flex flex-wrap gap-2.5">
                  
                  {isInPlan(workout.id) ? (
                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      className="inline-flex items-center gap-2 rounded-[8px] border border-[#c6ff00] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.05em] text-[#c6ff00] transition-all duration-200 hover:bg-[#c6ff00]/10"
                    >
                      <CalendarPlus size={13} />
                      Remove from Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToPlan(workout)}
                      className="inline-flex items-center gap-2 rounded-[8px] bg-[#c6ff00] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.05em] text-[#111214] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b8ed00]"
                    >
                      <CalendarPlus size={13} />
                      Add to today&apos;s plan
                    </button>
                  )}

               
                  <button
                    type="button"
                    onClick={() => toggleSaved(workout)}
                    aria-label={
                      isSaved(workout.id)
                        ? "Remove from saved"
                        : "Save workout for later"
                    }
                    className={`inline-flex items-center gap-2 rounded-[8px] border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.05em] transition-all duration-200 ${
                      isSaved(workout.id)
                        ? "border-[#c6ff00] text-[#c6ff00] hover:bg-[#c6ff00]/10"
                        : "border-[#343940] text-[#d4d6d9] hover:border-[#727780] hover:text-white"
                    }`}
                  >
                    <Bookmark
                      size={13}
                      className={
                        isSaved(workout.id)
                          ? "fill-[#c6ff00]"
                          : ""
                      }
                    />

                    <span>
                      {isSaved(workout.id)
                        ? "Saved"
                        : "Save for later"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}