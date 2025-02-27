"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Trophy,
  Clock,
  History,
  ChevronRight,
  User,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Hackathons from "./hackathons";

// Mock user data
const userHackathons = {
  participating: [
    { id: 1, title: "AI Innovation Challenge", date: "March 15-17, 2024" },
  ],
  registered: [{ id: 2, title: "Web3 Hackathon", date: "April 5-7, 2024" }],
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("current");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <Trophy className="h-5 w-5 text-green-400" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-blue-400" />;
      case "past":
        return <History className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full bg-gray-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <span className={`font-bold ${!isSidebarOpen && "hidden"}`}>
            Dashboard
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 hover:bg-gray-700"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* Profile Section */}
        <div className="border-b border-gray-700 p-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-700"
          >
            <User size={24} className="text-gray-400" />
            {isSidebarOpen && <span>John Doe</span>}
          </Link>
        </div>

        {/* User's Hackathons */}
        {isSidebarOpen && (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-400">
                PARTICIPATING
              </h3>
              {userHackathons.participating.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathon/${hackathon.id}`}
                  className="mb-2 flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
                >
                  <Trophy size={16} className="text-green-400" />
                  <div className="flex flex-col">
                    <span className="text-sm">{hackathon.title}</span>
                    <span className="text-xs text-gray-400">
                      {hackathon.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-400">
                REGISTERED
              </h3>
              {userHackathons.registered.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathon/${hackathon.id}`}
                  className="mb-2 flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700"
                >
                  <Clock size={16} className="text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-sm">{hackathon.title}</span>
                    <span className="text-xs text-gray-400">
                      {hackathon.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Search Bar */}
        <div className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900">
          <div className="container mx-auto px-4 py-4">
            <div className="mx-auto flex max-w-2xl gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 hover:bg-gray-700">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {/* Centered Navigation Buttons */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab("current")}
                className={`rounded-lg px-6 py-2 transition-colors ${
                  activeTab === "current"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`rounded-lg px-6 py-2 transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`rounded-lg px-6 py-2 transition-colors ${
                  activeTab === "past"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {/* Centered Hackathon Cards */}
          <Hackathons
            searchQuery={searchQuery}
            activeTab={activeTab}
          />
        </main>
      </div>
    </div>
  );
}
