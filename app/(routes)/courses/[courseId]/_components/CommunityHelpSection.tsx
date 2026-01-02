import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CommunityHelpSection() {
  return (
    <section className="mt-7">
      <div className="font-game p-5 sm:p-6 border-4 rounded-xl shadow-[3px_3px_0px_#1f1f1f] flex flex-col items-center text-center gap-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Need Help?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-300">
          Raise a suggestion or contact us
        </p>

        <Link href="/contact-us" className="w-full">
          <Button
            variant="pixel"
            className="w-full mt-3 text-sm sm:text-base md:text-lg"
          >
            Contact us
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default CommunityHelpSection;
