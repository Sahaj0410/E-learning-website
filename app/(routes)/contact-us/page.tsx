"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white font-game">
      <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] overflow-hidden">
        <Image
          src="/contactfinal.gif"
          width={1400}
          height={300}
          alt="contact-banner"
          className="w-full h-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-yellow-400">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mt-2">
            We would love to help you!
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-sm sm:text-lg">Your Name</label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-zinc-800 rounded-xl outline-none border border-zinc-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm sm:text-lg">Your Email</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-zinc-800 rounded-xl outline-none border border-zinc-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm sm:text-lg">Message</label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 mt-2 bg-zinc-800 rounded-xl outline-none border border-zinc-700 resize-none text-white"
              />
            </div>

            <Button
              variant="pixel"
              type="submit"
              className="text-base sm:text-lg py-5"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 mb-20 px-4">
        <p className="text-sm sm:text-lg text-gray-300">
          You can also reach us at:
        </p>
        <p className="text-lg sm:text-2xl text-yellow-400 mt-2">
          support@pixelpathshala.com
        </p>
      </div>
    </div>
  );
}
