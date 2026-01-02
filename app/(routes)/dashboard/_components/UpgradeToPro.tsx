import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function UpgradeToPro() {
  return (
    <section className="mt-8">
      <div className="flex flex-col items-center text-center gap-3 p-5 sm:p-6 border-4 rounded-2xl">
        <Image
          src="/crown.png"
          alt="pro"
          width={64}
          height={64}
          className="sm:w-[70px] sm:h-[70px]"
        />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
          Upgrade to Pro
        </h2>

        <p className="font-game text-gray-500 text-sm sm:text-base md:text-xl max-w-xs sm:max-w-sm">
          Join Pro Membership and get full course access
        </p>

        <Link href="/pricing">
          <Button
            variant="pixel"
            size="lg"
            className="font-game text-sm sm:text-base"
          >
            Upgrade Now
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default UpgradeToPro;
