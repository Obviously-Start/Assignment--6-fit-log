import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import type { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-[#24272d] bg-[#1b1b1b] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      
      <div className="h-52 overflow-hidden bg-[#15171b]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      
      <div className="p-5">
        
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="border border-[#3b3e44] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        
        <h3 className="font-display mt-4 text-2xl font-bold uppercase leading-tight text-white">
          {workout.name}
        </h3>

        
        <p className="mt-2 text-xs text-[#85878d]">
          {workout.equipment}
        </p>

        
        <div className="mt-5 grid grid-cols-3 border-t border-[#24272d] pt-4">
          <div className="flex items-center gap-1.5">
            <Clock3 size={13} className="text-[#ccff00]" />

            <div>
              <p className="text-[8px] uppercase tracking-wide text-[#55585e]">
                Time
              </p>

              <p className="text-[10px] font-bold text-white">
                {workout.duration} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame size={13} className="text-[#ccff00]" />

            <div>
              <p className="text-[8px] uppercase tracking-wide text-[#55585e]">
                Calories
              </p>

              <p className="text-[10px] font-bold text-white">
                {workout.caloriesBurned}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Star
              size={13}
              className="fill-[#ccff00] text-[#ccff00]"
            />

            <div>
              <p className="text-[8px] uppercase tracking-wide text-[#55585e]">
                Rating
              </p>

              <p className="text-[10px] font-bold text-white">
                {workout.rating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
