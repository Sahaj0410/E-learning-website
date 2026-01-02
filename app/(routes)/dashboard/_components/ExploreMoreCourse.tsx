import React from "react";
import CourseList from "../../courses/_components/CourseList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ExploreMoreCourse() {
  return (
    <section className="mt-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-game">
          Explore more courses
        </h2>

        <Link href="/courses">
          <Button
            variant="pixel"
            className="font-game text-sm sm:text-base md:text-lg w-fit"
          >
            View all
          </Button>
        </Link>
      </div>

      <CourseList smallerCard={true} maxLimit={5} />
    </section>
  );
}

export default ExploreMoreCourse;
