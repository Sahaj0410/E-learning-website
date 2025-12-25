// app/(routes)/courses/[courseId]/_components/CourseDetailBanner.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { set } from "date-fns";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

type Course = {
  id: number;
  title: string;
  desc: string;
  level: string;
  bannerImage: string;
  tags: string;
  userEnrolled?: boolean;
};

type Props = {
  loading: boolean;
  courseDetail?: Course;
  refreshData: () => void;
};

export default function CourseDetailBanner({ loading, courseDetail , refreshData}: Props) {


  const [loading_,setLoading_] = useState(false);
  const EnrollCourse = async() => {
    setLoading_(true);
    const result = await axios.post('/api/enroll-course',{
      courseId : courseDetail?.id,
    })
      console.log(result);
      toast.success('Enrolled Successfully');
      refreshData();
    setLoading_(false);
      
  }

  return (
    <div>
      {!courseDetail?
      <Skeleton className="w-full h-[300px] rounded-2xl"/>
      :<div className="relative">
         <Image src={courseDetail?.bannerImage?.trimEnd()} alt={courseDetail?.title}
         width={1400} 
         height={300}
         className="w-full h-[300px] object-cover " 
         />
       <div className="font-game absolute top-0 pt-20 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black/80 to-white-50/50 h-full  ">
        <h2 className="text-6xl">{courseDetail?.title}</h2>
        <p className="text-3xl mt-3 text-gray-300">{courseDetail?.desc}</p>
       {!courseDetail?.userEnrolled ? (
  <Button
    onClick={EnrollCourse}
    className="text-2xl mt-7"
    variant={"pixel"}
    size={"lg"}
    disabled={loading_}
  >
    {loading_ && <Loader2Icon className="animate-spin" />}
    Enroll now
  </Button>
) : (
  <Button className="text-2xl mt-7" variant={"pixel"} size="lg">
    Continue learning
  </Button>
)}


       </div>
      </div>
      }
    </div>
  );
}
