"use client";

import { Sun, Moon, User } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function Topbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-end items-center gap-6 p-4 bg-white dark:bg-slate-800 shadow">
      <button onClick={toggle}>
        {dark ? <Sun /> : <Moon />}
      </button>

      <div className="relative">
        <User
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-slate-700 shadow-lg rounded-lg p-3">
            <p className="text-sm">Profile</p>
            <p className="text-sm">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}