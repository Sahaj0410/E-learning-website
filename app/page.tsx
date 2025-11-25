import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./Hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Header / navbar Section */}
     <Header/>
      {/* Hero Section */}
      <Hero/>
    </div>
  );
}
