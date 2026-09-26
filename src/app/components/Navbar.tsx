"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { usePlan } from "@/context/PlanContext";
import logo from "../images/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { planItems, savedWorkouts } = usePlan();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname.startsWith("/my-plan");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#24272d] bg-[#0b0d10]">
      <div className="container-fitlog">
        <nav className="flex h-[72px] items-center justify-between">
         
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <img
              src={logo.src}
              alt="FitLog"
              className="h-8 w-auto object-contain"
            />

            <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
              FITLOG
            </span>
          </Link>

         
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/"
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                isWorkoutActive
                  ? "bg-[#23271a] text-[#c6ff00]"
                  : "text-[#85878d] hover:bg-[#c6ff00] hover:text-[#111214]"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                isPlanActive
                  ? "bg-[#23271a] text-[#c6ff00]"
                  : "text-[#85878d] hover:bg-[#c6ff00] hover:text-[#111214]"
              }`}
            >
              My Plan
            </Link>
          </div>

         
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-[10px] font-medium text-[#b5b8bd] transition hover:text-white"
            >
              <span>Plan</span>

              <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#c6ff00] px-1.5 text-[10px] font-bold text-[#111214]">
                {planItems.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-[10px] font-medium text-[#b5b8bd] transition hover:text-white"
            >
              <span>Saved</span>

              <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full border border-[#3b3f46] bg-[#15171b] px-1.5 text-[10px] font-bold text-[#d7d9dc]">
                {savedWorkouts.length}
              </span>
            </Link>
          </div>

          
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((previous) => !previous)}
            className={`flex h-9 w-9 items-center justify-center rounded-[4px] border transition-all duration-200 md:hidden ${
              menuOpen
                ? "border-[#c6ff00] bg-[#c6ff00] text-[#111214]"
                : "border-[#30343a] text-[#d7d9dc] hover:border-[#c6ff00] hover:bg-[#c6ff00] hover:text-[#111214]"
            }`}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </nav>

        
        {menuOpen && (
          <div className="border-t border-[#24272d] py-4 md:hidden">
            <div className="flex flex-col gap-2">
             
              <Link
                href="/"
                onClick={closeMenu}
                className={`flex h-[42px] items-center px-3 text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  isWorkoutActive
                    ? "bg-[#c6ff00] text-[#111214]"
                    : "text-[#c6ff00] hover:bg-[#c6ff00] hover:text-[#111214]"
                }`}
              >
                Workouts
              </Link>

            
              <Link
                href="/my-plan"
                onClick={closeMenu}
                className={`flex h-[42px] items-center px-3 text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  isPlanActive
                    ? "bg-[#c6ff00] text-[#111214]"
                    : "text-[#c6ff00] hover:bg-[#c6ff00] hover:text-[#111214]"
                }`}
              >
                My Plan
              </Link>

             
              <div className="mt-3 flex gap-2 border-t border-[#24272d] pt-4">
               
                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-full bg-[#c6ff00] text-[12px] font-bold uppercase tracking-wide text-[#111214] transition-all duration-200 hover:bg-[#c0f013]"
                >
                  <span>Plan</span>

                  <span className="font-display text-[12px] font-bold text-[#111214]">
                    {planItems.length}
                  </span>
                </Link>

               
                <Link
                  href="/my-plan"
                  onClick={closeMenu}
                  className="flex h-[38px] flex-1 items-center justify-center gap-2 rounded-full border border-[#4a4f57] bg-transparent text-[12px] font-bold uppercase tracking-wide text-white transition-all duration-200 hover:border-[#c6ff00] hover:bg-[#accf2e] hover:text-[#000000]"
                >
                  <span>Saved</span>

                  <span className="font-display text-[12px] font-bold">
                    {savedWorkouts.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}