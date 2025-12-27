"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Split from "react-split";
import { exercise } from "../../../_components/CourseList";
import ContentSection from "./_components/ContentSection";


export type CourseExercise = {
  chapterId:number,
  courseId:number,
  desc:string,
  name:string,
  exercises:exercise[],
  exerciseData : ExerciseData

}

type ExerciseData = {
  chapterId:number,
  courseId:number,
  ererciseName:string,
  exerciseId:string,
  exercisesContent : ExerciseContent 


}

type ExerciseContent = {
   content: string,
   hint : string,
   hintXp : string,
   starterCode : any,
   task:string


}


function Playground() {

  const {courseId,chapterId,exerciseslug} = useParams();
  const [loading,setLoading] = useState(false)

 const [courseExerciseData, setCourseExerciseData] = useState<CourseExercise>();

  useEffect(()=>{
    GetExerciseCourseDetail()
  },[])

  const GetExerciseCourseDetail = async() => {
    setLoading(true);
    const result = await axios.post('/api/exercise',{
      courseId : courseId,
      chapterId : chapterId,
      exerciseId : exerciseslug
    })

    console.log(result.data)
    setCourseExerciseData(result.data)
    setLoading(false)
  }


  return (
    <div className="border-t-4 ">  
      <Split
        className="h-full flex"
        sizes={[40, 60]}
        minSize={100}
        gutterSize={10}
        direction="horizontal"
      >
        <div className="">
          <ContentSection  courseExerciseData = {courseExerciseData}
          loading = {loading} />
          </div>
        <div className="">Code Editor</div>
      </Split>
    </div>
  );
}

export default Playground;
