"use client";

import React, { useEffect, useState } from "react";
import Welcomebanner from "./_components/Welcomebanner";
import EnrolledCourses from "./_components/EnrolledCourses";
import ExploreMore from "./_components/ExploreMore";
import InviteFriend from "./_components/InviteFriend";
import UserStatus from "./_components/UserStatus";
import UpgradeToPro from "./_components/UpgradeToPro";
import ExploreMoreCourse from "./_components/ExploreMoreCourse";
import axios from "axios";
import CommunityHelpSection from "../courses/[courseId]/_components/CommunityHelpSection";

function Dashboard() {
  const [isPro, setIsPro] = useState<boolean | null>(null);

  useEffect(() => {
    fetchUserSubscription();
  }, []);

  const fetchUserSubscription = async () => {
    try {
      const res = await axios.get("/api/user");
      setIsPro(res.data.subscriptionStatus === "pro");
    } catch (err) {
      console.error("Failed to fetch sub status:", err);
      setIsPro(false);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-36 xl:px-48">
      <div className="grid grid-cols-3 gap-7">
        <div className="col-span-2">
          <Welcomebanner />
          <EnrolledCourses />
          <ExploreMoreCourse />
          <ExploreMore />
          <InviteFriend />
        </div>

        <div>
          <UserStatus />
          <CommunityHelpSection/>
       
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
