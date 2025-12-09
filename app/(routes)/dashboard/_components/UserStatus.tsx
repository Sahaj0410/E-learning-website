"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function UserStatus() {
  const { user } = useUser();

  return (
    <div className="p-4 border-4 rounded-2xl">
      {/* TOP SECTION — FIXED OVERFLOW */}
      <div className="flex gap-3 items-center min-w-0">
        <Image src={"/alex_walk.gif"} alt="walkinguser" width={70} height={70} />

        <h2
          className="font-game text-2xl max-w-[160px] sm:max-w-[220px] md:max-w-[260px] truncate"
          title={user?.primaryEmailAddress?.emailAddress}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-5 mt-4">
        <div className="flex gap-3 items-center">
          <Image src={"/star.png"} alt="star" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">20</h2>
            <h2 className="font-game text-gray-500 text-xl">Total Rewards</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Image src={"/badge.png"} alt="badge" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">3</h2>
            <h2 className="font-game text-gray-500 text-xl">Badge</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Image src={"/fire.png"} alt="fire" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">7</h2>
            <h2 className="font-game text-gray-500 text-xl">Daily Streak</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatus;
