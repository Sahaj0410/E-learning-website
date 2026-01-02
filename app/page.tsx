import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./Hero";
import HomeCourses from "./_components/HomeCourses";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
    
      <Hero/>
      <HomeCourses/>
      <Footer/>
    </div>
  );
}
