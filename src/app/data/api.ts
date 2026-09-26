/*import type { Workout } from "../types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();

  return data;
}

export async function getWorkoutById(
  id: number
): Promise<Workout | undefined> {
  const workouts = await getWorkouts();

  return workouts.find((workout) => workout.id === id);
}
*/