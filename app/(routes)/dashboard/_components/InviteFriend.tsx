"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function InviteFriend() {
  return (
    <section className="mt-8">
      <div className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 border border-zinc-800 rounded-xl bg-zinc-900">
        <Image src="/mail.png" alt="mail" width={72} height={72} />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
          Invite Friend
        </h2>

        <p className="font-game text-sm sm:text-base text-gray-300 max-w-md">
          Having fun? Share the love with a friend. Enter an email and we will
          send them a personal invite.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full max-w-md mt-4">
          <input
            type="email"
            placeholder="Enter invitee email"
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-white"
          />

          <Button
            variant="pixel"
            className="font-game font-bold text-sm sm:text-base w-full sm:w-auto"
          >
            Invite
          </Button>
        </div>
      </div>
    </section>
  );
}

export default InviteFriend;
