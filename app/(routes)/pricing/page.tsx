"use client";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function PricingPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const res = await axios.get("/api/subscription");
        setIsPro(res.data.isPro);
      } catch {
        setIsPro(false);
      }
    };
    fetchSubscriptionStatus();
  }, []);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      await axios.post("/api/upgrade");
      toast.success("You are now a Pro user");
      setIsPro(true);
    } catch {
      toast.error("Upgrade failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-12 font-game">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <h2 className="text-3xl sm:text-4xl text-center">
          Pricing
        </h2>

        <p className="text-base sm:text-lg text-center mt-2">
          Join for unlimited access to all features and courses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 justify-center">
          <div className="border-4 p-6 rounded-2xl w-full max-w-sm mx-auto">
            <h3 className="text-2xl sm:text-3xl">Free</h3>
            <p className="text-xl sm:text-2xl mt-3">$0 / month</p>

            <ul className="text-sm sm:text-lg mt-4 space-y-2">
              <li>Limited courses</li>
              <li>Limited exercises</li>
              <li>Limited features</li>
              <li>No AI support</li>
            </ul>

            <Button disabled className="mt-6 w-full">
              Current Plan
            </Button>
          </div>

          <div className="border-4 p-6 rounded-2xl w-full max-w-sm mx-auto">
            <h3 className="text-2xl sm:text-3xl">Pro</h3>
            <p className="text-xl sm:text-2xl mt-3">$8.99 / month</p>

            <ul className="text-sm sm:text-lg mt-4 space-y-2">
              <li>Unlimited courses</li>
              <li>All exercises unlocked</li>
              <li>AI support for help</li>
              <li>24/7 Discord support</li>
            </ul>

            {!user ? (
              <Link href="/sign-in">
                <Button variant="pixel" className="mt-6 w-full">
                  Sign in to upgrade
                </Button>
              </Link>
            ) : (
              <Button
                variant="pixel"
                className="mt-6 w-full"
                onClick={handleUpgrade}
                disabled={loading || isPro}
              >
                {isPro ? "Already Pro" : loading ? "Upgrading..." : "Upgrade to Pro"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
