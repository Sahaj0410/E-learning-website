'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function InviteFriend() {
  return (
    <div className="flex flex-col items-center mt-8 p-4 border rounded-xl bg-zinc-900 ">
      <Image src={'/mail.png'} alt="mail" width={80} height={80} />
      <h2 className="text-3xl font-game">Invite Friend</h2>
      <p className="font-game">
        Having Fun? Share the love with a friend! Enter an email and we will send them a personal invite
      </p>

      <div className="flex gap-2 items-center mt-5">
        <input
          className="min-w-sm"
          placeholder="Enter Invitee Email"
          type="email"
        />
        <Button variant={'pixel'} className="font-game font-bold">
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteFriend;
