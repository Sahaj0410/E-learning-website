import React from "react";
import Image from "next/image";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quizz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: "/tree.png",
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: "/game.png",
  },
  {
    id: 3,
    title: "Community Project",
    desc: "Build real-world apps by collaborating with the community.",
    icon: "/growth.png",
  },
  {
    id: 4,
    title: "Explore Apps",
    desc: "Explore prebuild app which you can try demo and build it.",
    icon: "/start-up.png",
  },
];

function ExploreMore() {
  return (
    <section className="mt-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 font-game">
        Explore More{" "}
        <span className="text-gray-400 text-sm sm:text-base">
          (coming soon...)
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {ExploreMoreOptions.map((option) => (
          <div
            key={option.id}
            className="flex gap-3 border border-zinc-800 rounded-xl p-3 bg-zinc-900 items-start"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={64}
              height={64}
              className="shrink-0"
            />

            <div>
              <h3 className="font-game font-medium text-base sm:text-lg md:text-xl">
                {option.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base font-game">
                {option.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreMore;
