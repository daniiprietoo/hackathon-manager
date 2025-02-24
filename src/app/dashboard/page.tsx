"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Trophy, Clock, History, ChevronRight, User, ChevronLeft } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const hackathons = [
  {
    id: 1,
    title: "AI Innovation Challenge",
    date: "March 15-17, 2024",
    status: "current",
    participants: 120,
    theme: "Artificial Intelligence",
    description: "Create innovative AI solutions for real-world problems",
  },
  {
    id: 2,
    title: "Web3 Hackathon",
    date: "March 15-17, 2024",
    status: "current",
    participants: 20,
    theme: "Artificial Intelligence",
    description: "Create innovative AI solutions for real-world problems",
  },
  {
    id: 2,
    title: "Web3 Hackathon",
    date: "April 5-7, 2024",
    status: "upcoming",
    participants: 80,
    theme: "Blockchain",
    description: "Building the future of decentralized applications",
  },
  {
    id: 3,
    title: "Green Tech Challenge",
    date: "February 1-3, 2024",
    status: "past",
    participants: 150,
    theme: "Sustainability",
    description: "Developing sustainable technology solutions",
  },
]

// Mock user data
const userHackathons = {
  participating: [{ id: 1, title: "AI Innovation Challenge", date: "March 15-17, 2024" }],
  registered: [{ id: 2, title: "Web3 Hackathon", date: "April 5-7, 2024" }],
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("current")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const filteredHackathons = hackathons.filter(
    (hackathon) =>
      hackathon.status === activeTab &&
      (hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.theme.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <Trophy className="w-5 h-5 text-green-400" />
      case "upcoming":
        return <Clock className="w-5 h-5 text-blue-400" />
      case "past":
        return <History className="w-5 h-5 text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 transition-all duration-300 ease-in-out z-50 
          ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className={`font-bold ${!isSidebarOpen && "hidden"}`}>Dashboard</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-700 rounded-lg">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/profile" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-lg">
            <User size={24} className="text-gray-400" />
            {isSidebarOpen && <span>John Doe</span>}
          </Link>
        </div>

        {/* User's Hackathons */}
        {isSidebarOpen && (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">PARTICIPATING</h3>
              {userHackathons.participating.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathon/${hackathon.id}`}
                  className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg mb-2"
                >
                  <Trophy size={16} className="text-green-400" />
                  <div className="flex flex-col">
                    <span className="text-sm">{hackathon.title}</span>
                    <span className="text-xs text-gray-400">{hackathon.date}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">REGISTERED</h3>
              {userHackathons.registered.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathon/${hackathon.id}`}
                  className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg mb-2"
                >
                  <Clock size={16} className="text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-sm">{hackathon.title}</span>
                    <span className="text-xs text-gray-400">{hackathon.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Search Bar */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hackathons..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {/* Centered Navigation Buttons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === "current" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Current
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === "upcoming" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  activeTab === "past" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Past
              </button>
            </div>
          </div>

          {/* Centered Hackathon Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <Link
                  key={hackathon.id}
                  href={`/hackathon/${hackathon.id}`}
                  className="block bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(hackathon.status)}
                          <span className="text-sm font-medium text-gray-400 capitalize">{hackathon.status}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-1">{hackathon.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 text-wrap">{hackathon.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {hackathon.date}
                      </div>
                      <span>{hackathon.participants} participants</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredHackathons.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No hackathons found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

