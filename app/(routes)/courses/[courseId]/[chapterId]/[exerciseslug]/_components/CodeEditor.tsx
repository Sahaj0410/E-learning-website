"use client";
import React from "react";
import Split from "react-split";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
  isCompleted: boolean;
};

const CodeEditorChildren = ({ onCompleteExercise, isCompleted }: any) => {
  const { sandpack } = useSandpack();
  return (
    <div className="bg-[#151515] px-3 py-2 flex justify-center gap-4 sticky bottom-0 z-20">
      <Button variant="pixel" size="lg" onClick={() => sandpack.runSandpack()}>
        Run Code
      </Button>

      <Button
        variant="pixel"
        className={`bg-[#a3e534] ${
          isCompleted ? "opacity-50 cursor-not-allowed" : ""
        }`}
        size="lg"
        onClick={onCompleteExercise}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed" : "Mark Completed"}
      </Button>
    </div>
  );
};

function CodeEditor({ courseExerciseData, isCompleted }: Props) {
  const router = useRouter();
  const { user } = useUser();

  const onCompleteExercise = async () => {
    if (!courseExerciseData || isCompleted) return;

    const { courseId, chapterId, exerciseId } =
      courseExerciseData.exerciseData;

    await axios.post("/api/exercise/complete", {
      courseId: Number(courseId),
      chapterId: Number(chapterId),
      exerciseId: String(exerciseId),
      userEmail: user!.primaryEmailAddress?.emailAddress,
    });

    toast.success("Exercise Completed 🚀");

toast.success("Exercise Completed 🚀");

router.refresh();
  };

  return (
    <SandpackProvider
      template="static"
      theme="dark"
      files={{
        [`/${
          courseExerciseData?.exerciseData?.exercisesContent?.starterCode?.fileName ||
          "index.html"
        }`]:
          courseExerciseData?.exerciseData?.exercisesContent?.starterCode?.code ||
          "",
      }}
      options={{
        autorun: false,
        autoReload: false,
      }}
    >
      <SandpackLayout className="h-full bg-white">
        <Split
          className="flex h-full w-full"
          sizes={[50, 50]}
          minSize={200}
          gutterSize={10}
          direction="horizontal"
        >
          <div className="flex flex-col h-full w-full">
            <div className="flex-1 min-h-0 overflow-auto">
              <SandpackCodeEditor showTabs showRunButton={false} />
            </div>

            <CodeEditorChildren
              onCompleteExercise={onCompleteExercise}
              isCompleted={isCompleted}
            />
          </div>

          <SandpackPreview
            showNavigator
            showOpenInCodeSandbox={false}
            showOpenNewtab
          />
        </Split>
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default CodeEditor;
