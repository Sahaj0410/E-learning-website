"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { course } from "@/app/(routes)/courses/_components/CourseList";
import { Button } from "@/components/ui/button";

export default function HomeCourses() {
  const [courses, setCourses] = useState<course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await axios.get("/api/course/all");
      setCourses(result.data.slice(0, 3));
    };
    fetchCourses();
  }, []);

  return (
    <section className="mt-20 font-game text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Some of our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-yellow-400 transition cursor-pointer p-3 h-full flex flex-col">
                <Image
                  src={course.bannerImage}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="rounded-xl object-cover w-full h-[160px] sm:h-[170px] md:h-[180px]"
                />

                <h3 className="text-lg sm:text-xl md:text-2xl mt-3">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mt-1 flex-1">
                  {course.desc}
                </p>

                <p className="text-yellow-400 mt-3 text-sm">
                  Level: {course.level}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/courses">
            <Button
              variant="pixel"
              className="font-game text-lg sm:text-xl px-6 py-4"
            >
              Explore all
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
