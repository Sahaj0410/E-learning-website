import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/config/db';
import { CourseChaptersTable, coursesTable } from '@/config/schema';

export async function GET(req: NextRequest) {
 const DATA = [
  {
    "id": 1,
    "name": "JavaScript Basics",
    "desc": "Learn what JavaScript is and write your first lines of code.",
    "exercises": []
  },
  {
    "id": 2,
    "name": "Variables & Data Types",
    "desc": "Work with numbers, strings, booleans, and variables in JavaScript.",
    "exercises": []
  },
  {
    "id": 3,
    "name": "Conditions & Loops",
    "desc": "Control logic with if/else and repeat actions using loops.",
    "exercises": []
  },
  {
    "id": 4,
    "name": "Functions",
    "desc": "Create reusable blocks of code to organize your logic.",
    "exercises": []
  },
  {
    "id": 5,
    "name": "Arrays & Objects",
    "desc": "Store and manage structured collections of data.",
    "exercises": []
  },
  {
    "id": 6,
    "name": "DOM Manipulation",
    "desc": "Select and update webpage elements dynamically.",
    "exercises": []
  },
  {
    "id": 7,
    "name": "Events & Interactivity",
    "desc": "Respond to user actions like clicks and input changes.",
    "exercises": []
  },
  {
    "id": 8,
    "name": "Error Handling",
    "desc": "Use try/catch to prevent crashes and handle runtime errors.",
    "exercises": []
  },
  {
    "id": 9,
    "name": "Loops Deep Dive",
    "desc": "Master for, while, and array iteration methods like map & filter.",
    "exercises": []
  },
  {
    "id": 10,
    "name": "Strings Mastery",
    "desc": "Format, slice, and modify text using string methods.",
    "exercises": []
  },
  {
    "id": 11,
    "name": "Modules & Imports",
    "desc": "Organize code into files and reuse functionality with ES modules.",
    "exercises": []
  },
  {
    "id": 12,
    "name": "Final Mini Project",
    "desc": "Build a complete interactive JavaScript project and show what you've learned.",
    "exercises": []
  }
]






const promises = DATA.map(item =>
  db.insert(CourseChaptersTable).values({
    chapterID: item.id,
    courseID: 4,
    name: item.name,
    description: item.desc,
    exercises: JSON.stringify(item.exercises),
  })
);
try {
  await Promise.all(promises);
  return NextResponse.json("Success");
} catch (err) {
  console.error(err);
  return NextResponse.json({ error: String(err) }, { status: 500 });
}}
