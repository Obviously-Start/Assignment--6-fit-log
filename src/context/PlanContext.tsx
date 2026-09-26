"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "../app/types/workout";
import { useToast } from "./ToastContext";

export interface PlanItem {
  workout: Workout;
  done: boolean;
}

const PLAN_CAP = 5;

interface PlanContextValue {
  planItems: PlanItem[];
  savedWorkouts: Workout[];

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanFull: () => boolean;

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  toggleDone: (id: number) => void;
  toggleSaved: (workout: Workout) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(
  undefined
);

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";


function loadPlan(): PlanItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(PLAN_KEY);

    if (!data) {
      return [];
    }

    const parsed: unknown = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return parsed as PlanItem[];
    }

    return [];
  } catch (error) {
    console.error("Failed to load plan:", error);
    return [];
  }
}


function loadSavedWorkouts(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(SAVED_KEY);

    if (!data) {
      return [];
    }

    const parsed: unknown = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return parsed as Workout[];
    }

    return [];
  } catch (error) {
    console.error("Failed to load saved workouts:", error);
    return [];
  }
}

export function PlanProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { showToast } = useToast();

  
  const [planItems, setPlanItems] =
    useState<PlanItem[]>(loadPlan);

  const [savedWorkouts, setSavedWorkouts] =
    useState<Workout[]>(loadSavedWorkouts);

  
  useEffect(() => {
    try {
      localStorage.setItem(
        PLAN_KEY,
        JSON.stringify(planItems)
      );
    } catch (error) {
      console.error("Failed to save plan:", error);
    }
  }, [planItems]);

  
  useEffect(() => {
    try {
      localStorage.setItem(
        SAVED_KEY,
        JSON.stringify(savedWorkouts)
      );
    } catch (error) {
      console.error("Failed to save saved workouts:", error);
    }
  }, [savedWorkouts]);

  
  const isInPlan = (id: number) => {
    return planItems.some(
      (item) => item.workout.id === id
    );
  };

  
  const isSaved = (id: number) => {
    return savedWorkouts.some(
      (workout) => workout.id === id
    );
  };

 
  const isPlanFull = () => planItems.length >= PLAN_CAP;

  const addToPlan = (workout: Workout) => {
    const alreadyInPlan = planItems.some(
      (item) => item.workout.id === workout.id
    );

    if (alreadyInPlan) {
      return;
    }

    if (isPlanFull()) {
      showToast(
        "Today's plan is full (5 lifts max)",
        "error"
      );
      return;
    }

    setPlanItems((previous) => [
      ...previous,
      {
        workout,
        done: false,
      },
    ]);

    showToast(
      `${workout.name} added to plan`,
      "success"
    );
  };

  
  const removeFromPlan = (id: number) => {
    const item = planItems.find(
      (entry) => entry.workout.id === id
    );

    setPlanItems((previous) =>
      previous.filter(
        (entry) => entry.workout.id !== id
      )
    );

    if (item) {
      showToast(
        `${item.workout.name} removed from plan`,
        "error"
      );
    }
  };

  
  const toggleDone = (id: number) => {
    const item = planItems.find(
      (entry) => entry.workout.id === id
    );

    if (!item) {
      return;
    }

    const nextDone = !item.done;

    setPlanItems((previous) =>
      previous.map((entry) =>
        entry.workout.id === id
          ? {
              ...entry,
              done: nextDone,
            }
          : entry
      )
    );

    showToast(
      nextDone
        ? `${item.workout.name} marked done`
        : `${item.workout.name} back on the plan`,
      nextDone ? "success" : "info"
    );
  };

  
  const toggleSaved = (workout: Workout) => {
    setSavedWorkouts((previous) => {
      const alreadySaved = previous.some(
        (item) => item.id === workout.id
      );

      if (alreadySaved) {
        showToast(
          `${workout.name} removed from saved`,
          "info"
        );

        return previous.filter(
          (item) => item.id !== workout.id
        );
      }

      showToast(
        `${workout.name} saved`,
        "success"
      );

      return [...previous, workout];
    });
  };

  
  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedWorkouts,
        isInPlan,
        isSaved,
        isPlanFull,
        addToPlan,
        removeFromPlan,
        toggleDone,
        toggleSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}


export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used within a PlanProvider"
    );
  }

  return context;
}