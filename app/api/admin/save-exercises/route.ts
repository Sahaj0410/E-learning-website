import {db} from "@/config/db";
import { ExerciseTable , CourseChaptersTable} from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = [
  {
    "courseId": 2,
    "exerciseslug": "explore-the-web-skeleton",
    "exerciseName": "Explore the Web Skeleton",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>Explore the Web Skeleton</h2><p>The web is built using HTML which acts like the skeleton of every web page. In this mission, you will discover how different parts like the head and body work together to form a complete structure. Everything you see on a browser sits inside tags. Tags are like puzzle pieces that tell the browser what should appear where. You will learn how to open and close tags properly. Each web page must begin with a powerful starting line that tells the browser what version of HTML we are using. Just like bones give structure to our body, HTML tags give structure to a page. Explore how headings, paragraphs and more help display information clearly so users enjoy reading your content. Prepare yourself and dive into the world of website building. Once you learn the HTML skeleton, you are ready to build anything on the web!</p></body>",
      "task": "<body><p>Create an HTML page that includes a heading saying 'Welcome to My Web Skeleton' and a paragraph below describing what a skeleton of a webpage means.</p></body>",
      "hint": "<body><p>Use &lt;h1&gt; for heading and &lt;p&gt; for paragraph. Make sure both tags are inside &lt;body&gt;.</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<html>\n  <body>\n    <!-- Add your heading and paragraph here -->\n  </body>\n</html>"
      },
      "regex": "<h1>.*<\\/h1>|<p>.*<\\/p>",
      "output": "<body><h1>Welcome to My Web Skeleton</h1><p>This tells what a webpage skeleton is!</p></body>",
      "hintXp": 40
    }
  },
  {
    "courseId": 2,
    "exerciseslug": "build-your-base-camp",
    "exerciseName": "Build Your Base Camp",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>Build Your Base Camp</h2><p>Every explorer needs a base camp before going on adventures. In a webpage, this base camp is your basic HTML setup. This simple foundation helps the browser know what elements will appear inside the site. First, you will declare your document type to start the mission right. Then, you add an &lt;html&gt; tag which becomes the home of your webpage. Inside that home, &lt;head&gt; provides important setup information while &lt;body&gt; holds everything visible. You will add a title inside &lt;head&gt; which appears on browser tab. Today, you will create your own base camp which will serve as the starting point of all future pages. Stay organized, strong explorer — your journey begins here!</p></body>",
      "task": "<body><p>Create a base HTML structure including &lt;html&gt;, &lt;head&gt;, &lt;title&gt;, and &lt;body&gt;. Inside the body, write a short welcome message.</p></body>",
      "hint": "<body><p>Don't forget to include &lt;title&gt; inside &lt;head&gt;. Keep all your visible content in &lt;body&gt;.</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Base</title>\n  </head>\n  <body>\n    <!-- Add welcome message here -->\n  </body>\n</html>"
      },
      "regex": "<!DOCTYPE html>|<head>|<title>.*<\\/title>",
      "output": "<body><p>Welcome to my first base camp!</p></body>",
      "hintXp": 40
    }
  },
  {
    "courseId": 2,
    "exerciseslug": "name-your-world",
    "exerciseName": "Name Your World",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>Name Your World</h2><p>Every website has a unique name that appears on the browser tab, helping users know where they are. This name is added using the &lt;title&gt; tag inside the &lt;head&gt; section. It does not show on the main page but works behind the scenes. The world you build needs an identity and a purpose. A title gives your page a professional and meaningful first impression. Think of your webpage as a city and the title as the board at the entrance that welcomes people in. Today, you will assign your first website name and proudly display it to the world. Choose wisely!</p></body>",
      "task": "<body><p>Inside &lt;head&gt;, add a title that says 'My Awesome Web World'.</p></body>",
      "hint": "<body><p>Make sure &lt;title&gt; is inside &lt;head&gt; and spelled correctly.</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Add title here -->\n  </head>\n  <body>\n    <p>Welcome adventure!</p>\n  </body>\n</html>"
      },
      "regex": "<title>.*<\\/title>",
      "output": "<body><p>Welcome adventure!</p></body>",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseslug": "break-and-repair",
    "exerciseName": "Break & Repair",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>Break & Repair</h2><p>Sometimes tags break because they are not properly closed. A broken tag causes the browser to behave strangely. As an HTML detective, you must find mistakes and fix them using the correct closing tags. Code breaks help us learn how things really work. Once you discover the bug, you become stronger at building. In this mission, you will intentionally break part of your page and then repair it, celebrating your success. Learning comes from both mistakes and achievements. Are you ready to repair the web?</p></body>",
      "task": "<body><p>Fix the incorrectly closed &lt;h2&gt; tag in the given starter code.</p></body>",
      "hint": "<body><p>Closing tags always start with / before the tag name.</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<html>\n  <body>\n    <h2>Broken Heading<h2>\n    <p>Can you fix me?</p>\n  </body>\n</html>"
      },
      "regex": "<h2>.*<\\/h2>",
      "output": "<body><h2>Broken Heading</h2><p>Can you fix me?</p></body>",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseslug": "html-detective",
    "exerciseName": "HTML Detective",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>HTML Detective</h2><p>You are now a detective! You must find hidden errors in the page structure. HTML loves order and clarity. If something goes missing, like a proper tag, chaos may appear. Your job is to investigate the clues, find the missing piece, and fix the layout. Great developers are excellent detectives because they notice even tiny mistakes that others miss. Your investigation begins now!</p></body>",
      "task": "<body><p>Fix the missing closing tag in the paragraph.</p></body>",
      "hint": "<body><p>Paragraph must start and end with &lt;p&gt;</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<body>\n  <p>This sentence needs a fix\n</body>"
      },
      "regex": "<p>.*<\\/p>",
      "output": "<body><p>This sentence needs a fix</p></body>",
      "hintXp": 30
    }
  },
  {
    "courseId": 2,
    "exerciseslug": "element-collector",
    "exerciseName": "Element Collector",
    "chapterId": 1,
    "exercisesContent": {
      "content": "<body><h2 style='font-family:Arial;'>Element Collector</h2><p>Every webpage is filled with different elements. You will collect them like rare treasures! Headings make text bold and clear. Paragraphs help explain stories. Line breaks separate ideas. Today, you will use multiple elements together and see how the browser builds the page piece by piece. Start collecting your HTML powers one element at a time!</p></body>",
      "task": "<body><p>Create a body with a heading, paragraph and a line break between them.</p></body>",
      "hint": "<body><p>Use &lt;br&gt; for line break.</p></body>",
      "starterCode": {
        "fileName": "index.html",
        "code": "<html>\n  <body>\n    <!-- Add heading, paragraph and break here -->\n  </body>\n</html>"
      },
      "regex": "<br>|<h.*>|<p>.*<\\/p>",
      "output": "<body><h1>Hello Explorer</h1><br><p>I collected elements!</p></body>",
      "hintXp": 35
    }
  }
]


export async function GET(req: NextRequest) {
    DATA.forEach(async (item) => {
        await db.insert(ExerciseTable).values({
            courseId: item?.courseId,
            chapterId: item?.chapterId,
            exerciseId: item?.exerciseslug,
            exercisesContent: item?.exercisesContent,
            ererciseName: item?.exerciseName,
        })
    })

    return NextResponse.json({ message: 'Exercises saved successfully' });
}
 