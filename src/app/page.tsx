"use client";

import Footer from "@/_compnents/footer";
import Header from "@/_compnents/header";
import { ArrowRight, Code2, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 py-20 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem]" />
            <div className="absolute inset-0 bg-transparent bg-[linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem]" />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block rounded-full bg-blue-50 px-2 py-px text-xs font-medium leading-5 text-blue-600 shadow-sm">
                Hackathon Management Made Simple
              </span>
              <h1 className="mb-8 text-4xl font-bold tracking-tighter md:text-6xl">
                The Ultimate Platform for{" "}
                <span className="text-blue-600">University Hackathons</span>
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                Streamline your hackathon organization process with our
                comprehensive platform designed specifically for universities.
                Connect students, faculty, and innovation in one place.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Everything You Need to Run Successful Hackathons
              </h2>
              <p className="text-lg text-gray-600">
                Our platform provides all the tools necessary for organizing and
                managing hackathons at your university.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">User Management</h3>
                <p className="text-gray-600">
                  Separate portals for students and faculty with role-based
                  access control and authentication.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Event Organization
                </h3>
                <p className="text-gray-600">
                  Create and manage hackathon events with customizable themes,
                  schedules, and guidelines.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                  <Code2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">
                  Project Submissions
                </h3>
                <p className="text-gray-600">
                  Streamlined submission process with GitHub integration and
                  comprehensive project documentation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
