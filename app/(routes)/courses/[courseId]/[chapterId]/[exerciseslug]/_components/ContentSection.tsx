import React from 'react'
import { CourseExercise } from '../page'
import { Skeleton } from '@/components/ui/skeleton'
import { Lightbulb } from 'lucide-react'
type props = {
    courseExerciseData : CourseExercise | undefined
    loading : boolean
}

function ContentSection({courseExerciseData,loading} : props) {

  const Contentinfo = courseExerciseData?.exerciseData;

  return (
    <div className='p-10'>
      {loading || !Contentinfo ? (
        <Skeleton className='h-full w-full m-10 rounded-2xl' />
      ) : (
        <div>
          <h2 className='font-game text-3xl my-3'>
            {Contentinfo?.ererciseName}
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html: Contentinfo?.exercisesContent?.content || ""
            }}
          />

          <div className='mt-6'>
            <h2 className='font-game text-3xl mb-2'>Task</h2>
            <div
            className='p-4 border rounded-2xl bg-zinc-800'
              dangerouslySetInnerHTML={{
                __html: Contentinfo?.exercisesContent?.task || ""
              }}
            />
          </div>

           <div className='mt-6'>
            <h2 className='font-game text-3xl mb-2 flex gap-2 items-center text-yellow-400'> <Lightbulb/>  Hint</h2>
            <div
            className='p-4 border rounded-2xl bg-zinc-800'
              dangerouslySetInnerHTML={{
                __html: Contentinfo?.exercisesContent?.hint || ""
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentSection
