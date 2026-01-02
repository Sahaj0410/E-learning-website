"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function UserStatus() {
  const { user } = useUser();

  const [stats, setStats] = useState({
    totalXP: 0,
    badges: 0,
    completedExercises: 0,
  });

  useEffect(() => {
    if (user) getUserStats();
  }, [user]);

  const getUserStats = async () => {
    try {
      const res = await axios.get("/api/user-stats");
      setStats({
        totalXP: res.data.totalXP || 0,
        badges: res.data.badges || 0,
        completedExercises: res.data.completedExercises || 0,
      });
    } catch {
      setStats({ totalXP: 0, badges: 0, completedExercises: 0 });
    }
  };

  return (
    <section className="p-4 sm:p-5 border-4 rounded-2xl bg-black/25">
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src="/alex_walk.gif"
          alt="user"
          width={56}
          height={56}
          className="sm:w-[64px] sm:h-[64px]"
          unoptimized
        />

        <h2
          className="font-game text-lg sm:text-xl md:text-2xl truncate"
          title={user?.primaryEmailAddress?.emailAddress}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4">
        <div className="flex gap-3 items-center">
          <Image src="/star.png" alt="xp" width={32} height={32} />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
              {stats.totalXP}
            </h2>
            <p className="font-game text-gray-500 text-sm sm:text-base">
              Total XP
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Image src="/badge.png" alt="badge" width={32} height={32} />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
              {stats.badges}
            </h2>
            <p className="font-game text-gray-500 text-sm sm:text-base">
              Badges
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center sm:col-span-2">
          <Image src="/book.png" alt="exercise" width={32} height={32} />
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
              {stats.completedExercises}
            </h2>
            <p className="font-game text-gray-500 text-sm sm:text-base">
              Exercises Completed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
