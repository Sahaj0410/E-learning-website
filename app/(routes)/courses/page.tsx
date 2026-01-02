import Image from "next/image";
import React from "react";
import CourseList from "./_components/CourseList";

function Courses() {
  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/course-final.gif"
          alt="coursebanner"
          width={1200}
          height={300}
          className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-cover"
          unoptimized
        />

        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/80 to-black/20">
          <div className="px-6 sm:px-10 md:px-20 lg:px-36">
            <h2 className="font-game text-2xl sm:text-4xl md:text-6xl">
              Explore All Courses
            </h2>
            <p className="font-game text-sm sm:text-lg md:text-2xl mt-2 max-w-2xl">
              Explore all courses and enroll to learn and increase your skills
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6 sm:px-10 md:px-24 lg:px-36">
        <h2 className="font-game text-2xl sm:text-3xl md:text-4xl mb-4">
          All Courses
        </h2>
        <CourseList />
      </div>
    </div>
  );
}

export default Courses;
