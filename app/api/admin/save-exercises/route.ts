import {db} from "@/config/db";
import { ExerciseTable , CourseChaptersTable} from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA =[
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "project-setup-js",
    "exerciseName": "Project Setup",
    "xp": 45,
    "exercisesContent": {
      "content": "Time to create your first real project! 🎯 A simple TODO app begins with HTML + JS setup.",
      "task": "Create a heading: My Todo App and link a script file main.js",
      "hint": "<script src='main.js'></script>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<h1>My Todo App</h1>\n<script src=\"main.js\"></script>"
      },
      "regex": "Todo",
      "output": "<h1>My Todo App</h1>",
      "hintXp": 20
    }
  },
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "build-ui-elements",
    "exerciseName": "Build UI Elements",
    "xp": 50,
    "exercisesContent": {
      "content": "Add an input and button so users can enter tasks 📝",
      "task": "Add an input and a button below the heading.",
      "hint": "<input /><button>Add</button>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<h1>My Todo App</h1>\n<!-- Add input and button here -->"
      },
      "regex": "button",
      "output": "<input /><button>Add</button>",
      "hintXp": 25
    }
  },
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "add-interactivity-js",
    "exerciseName": "Add Interactivity",
    "xp": 50,
    "exercisesContent": {
      "content": "Let users add tasks dynamically using JavaScript 🚀",
      "task": "Add a click event to the button that logs input value.",
      "hint": "button.addEventListener('click', ...)",
      "starterCode": {
        "fileName": "main.js",
        "code": "const input = document.querySelector('input');\nconst btn = document.querySelector('button');\n\n// Add click action\n"
      },
      "regex": "addEventListener",
      "output": "addEventListener",
      "hintXp": 25
    }
  },
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "local-storage-save",
    "exerciseName": "Local Storage Save",
    "xp": 55,
    "exercisesContent": {
      "content": "Store todos even after page refresh using localStorage 🗂️",
      "task": "Save a task value in localStorage with key: todos",
      "hint": "localStorage.setItem('todos', JSON.stringify([]))",
      "starterCode": {
        "fileName": "main.js",
        "code": "let todos = [];\n// Save in localStorage\n"
      },
      "regex": "localStorage",
      "output": "localStorage.setItem",
      "hintXp": 30
    }
  },
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "user-friendly-design",
    "exerciseName": "User-Friendly Design",
    "xp": 50,
    "exercisesContent": {
      "content": "Add simple styles to make UI clean 🎨",
      "task": "Center everything and add spacing to input & button.",
      "hint": "Add margin/padding styles",
      "starterCode": {
        "fileName": "index.html",
        "code": "<style>\n/* Add simple CSS */\n</style>"
      },
      "regex": "style",
      "output": "style",
      "hintXp": 25
    }
  },
  {
    "courseId": 4,
    "chapterId": 12,
    "exerciseId": "project-showcase",
    "exerciseName": "Project Showcase",
    "xp": 60,
    "exercisesContent": {
      "content": "🎉 Your first JavaScript app is complete!",
      "task": "Display 'Task Added!' in console when a task is added.",
      "hint": "console.log('Task Added!')",
      "starterCode": {
        "fileName": "main.js",
        "code": "// Show success message\n"
      },
      "regex": "Task Added",
      "output": "Task Added!",
      "hintXp": 30
    }
  }
]


export async function GET(req: NextRequest) {
    for (const item of DATA) {
        await db.insert(ExerciseTable).values({
            courseId: item.courseId,
            chapterId: item.chapterId,
            exerciseId: item.exerciseId, 
            exercisesContent: item.exercisesContent,
            ererciseName: item.exerciseName,
            xp: item.xp 
        });
    }

    return NextResponse.json({ message: "Exercises saved successfully" });
}
