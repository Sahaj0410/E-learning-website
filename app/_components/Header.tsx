"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { course as Course } from "@/app/(routes)/courses/_components/CourseList";
import { BrainCircuit } from "lucide-react";

function Header() {
  const { user } = useUser();
  const [courses, setCourses] = useState<Course[]>();
  const { exerciseslug } = useParams();

  useEffect(() => {
    const getCourses = async () => {
      const result = await axios.get("/api/course/all");
      setCourses(result.data);
    };
    getCourses();
  }, []);

  return (
    <header className="w-full border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <h2 className="font-game font-bold text-lg sm:text-xl md:text-2xl">
            PixelPathshala
          </h2>
          <BrainCircuit/>
        </Link>

        {!exerciseslug && courses ? (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-[320px] sm:w-[420px] md:w-[520px] p-3">
                    {courses.map((course, index) => (
                      <li
                        key={index}
                        className="p-3 bg-zinc-900 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
                      >
                        <Link
                          href={`/courses/${course.id}`}
                          className="block space-y-1"
                        >
                          <h2 className="text-sm font-medium text-white">
                            {course.title}
                          </h2>

                          <p className="text-xs text-gray-400 line-clamp-2">
                            {course.desc || "No description available"}
                          </p>

                          <p className="text-[10px] text-yellow-300 uppercase">
                            Level: {course.level || "Beginner"}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact-us">Contact Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenu>
        ) : (
          <h2 className="hidden md:block text-sm sm:text-base font-game uppercase truncate">
            {exerciseslug?.toString().replaceAll("-", " ")}
          </h2>
        )}

        <div className="flex items-center gap-3 shrink-0">
          {!user ? (
            <Link href="/sign-in">
              <Button variant="pixel" className="text-sm sm:text-base">
                Sign-in
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="pixel" className="text-sm sm:text-base">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
