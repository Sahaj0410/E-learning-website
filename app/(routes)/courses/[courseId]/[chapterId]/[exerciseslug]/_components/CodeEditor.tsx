"use client";

import React, { useEffect, useState } from "react";
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

function CodeEditorActions({
  onCompleteExercise,
  localCompleted,
}: {
  onCompleteExercise: () => void;
  localCompleted: boolean;
}) {
  const { sandpack } = useSandpack();

  return (
    <div className="bg-[#151515] px-3 py-3 flex justify-center gap-3">
      <Button
        variant="pixel"
        size="lg"
        onClick={() => sandpack.runSandpack()}
      >
        Run Code
      </Button>

      <Button
        variant="pixel"
        size="lg"
        className={`bg-[#a3e534] ${
          localCompleted ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onCompleteExercise}
        disabled={localCompleted}
      >
        {localCompleted ? "Completed" : "Mark Completed"}
      </Button>
    </div>
  );
}

export default function CodeEditor({
  courseExerciseData,
  isCompleted,
}: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [localCompleted, setLocalCompleted] = useState(isCompleted);

  useEffect(() => {
    setLocalCompleted(isCompleted);
  }, [isCompleted]);

  const onCompleteExercise = async () => {
    if (!courseExerciseData || localCompleted) return;

    setLocalCompleted(true);

    const { courseId, chapterId, exerciseId } =
      courseExerciseData.exerciseData;

    await axios.post("/api/exercise/complete", {
      courseId: Number(courseId),
      chapterId: Number(chapterId),
      exerciseId: String(exerciseId),
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    toast.success("Exercise completed");
    router.refresh();
  };

  const template =
    courseExerciseData?.exerciseData?.technology === "react"
      ? "react"
      : "static";

  return (
    <SandpackProvider
      template={template}
      theme="dark"
      files={{
        [`/${
          courseExerciseData?.exerciseData?.exercisesContent?.starterCode
            ?.fileName || "index.html"
        }`]:
          courseExerciseData?.exerciseData?.exercisesContent?.starterCode
            ?.code || "",
      }}
      options={{ autorun: false, autoReload: false }}
    >
      <SandpackLayout className="h-full pb-[72px]">
        <Split
          className="flex h-full w-full flex-col md:flex-row"
          sizes={[50, 50]}
          minSize={200}
          gutterSize={8}
        >
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 overflow-auto">
              <SandpackCodeEditor showTabs showRunButton={false} />
            </div>

            <CodeEditorActions
              onCompleteExercise={onCompleteExercise}
              localCompleted={localCompleted}
            />
          </div>

          <div className="h-[300px] md:h-auto">
            <SandpackPreview showNavigator />
          </div>
        </Split>
      </SandpackLayout>
    </SandpackProvider>
  );
}
