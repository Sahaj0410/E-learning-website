import React from 'react'
import { course as Course } from '../../_components/CourseList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type Props = {
  loading: boolean;
  courseDetail?: Course;
};

function CourseChapters({loading,courseDetail}: Props) {
  return (
    <div>
      {courseDetail?.chapters?.length===0?
       <div>
        <Skeleton className='w-full h-[100px] rounded-2xl'/>
        <Skeleton className='w-full h-[100px] rounded-2xl mt-5'/>
       </div>  
         
         :
       <div className='p-5 border-4 rounded-2xl'>
        {courseDetail?.chapters?.map((chapter,index)=>(
          <Accordion type='single' collapsible key={index}>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='p-3 hover:bg-zinc-800 font-game text-3xl' >
                <div className='flex gap-10'><h2 className='h-12 w-12 bg-zinc-800 flex items-center justify-center rounded-full'>{index+1}</h2>
                <h2>{chapter?.name}</h2>
                </div>
                </AccordionTrigger>
              <AccordionContent>
                <div className='p-7 bg-zinc-900 rounded-xl'>
                  {chapter?.exercises.map((exx,indexexc)=>(
                    <div key={indexexc} className='flex items-center justify-between mb-7'>
                      <div className='flex items-center gap-10 font-game'>
                      <h2 className='text-2xl'>Exercise {index* chapter?.exercises?.length+indexexc +1}</h2>
                      <h2 className='text-2xl'>{exx?.name}</h2>
                      </div>
                      {/* <Button variant={'pixel'}>{exx?.xp} xp</Button> */}

                      <Tooltip>
                   <TooltipTrigger asChild> 
                      <Button variant={'pixelDisabled'}>???</Button>
                    </TooltipTrigger> 
                   <TooltipContent>
                   <p className='font-game text-lg'>Please Enroll first</p>
                   </TooltipContent>
                   </Tooltip>

                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
       </div>
      }
    </div>
  )
}

export default CourseChapters