"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

function Welcomebanner() {
  const { user } = useUser();

  return (
    <section className="flex items-center gap-3 sm:gap-4">
      <Image
        src="/machine.webp"
        alt="robo"
        width={96}
        height={96}
        className="w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] md:w-[120px] md:h-[120px]"
        unoptimized
      />

      <h2 className="font-game text-sm sm:text-lg md:text-2xl p-3 sm:p-4 border bg-zinc-800 rounded-lg rounded-bl-none leading-snug">
        Welcome back{" "}
        <span className="text-yellow-400">
          {user?.fullName}
        </span>
        , start learning something new...
      </h2>
    </section>
  );
}

export default Welcomebanner;
