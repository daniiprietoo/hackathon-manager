"use client";

import { Clock, Trophy, History, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";
import { getHackathons } from "@/server/db/server-actions";
import { useEffect, useState } from "react";


export default function Hackathons(props: {
  searchQuery: string;
  activeTab: string;
}) {
  const { searchQuery, activeTab } = props;

  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHackathons() {
      try {
        const data = await getHackathons();
        setHackathons(data || []);
      } catch (error) {
        console.error("Failed to load hackathons:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadHackathons();
  }, []);

  const getStatus = (submissionDeadline: Date | null): string => {
    const currentDate = new Date();

    if (submissionDeadline && submissionDeadline > currentDate) {
      return "upcoming";
    } else if (submissionDeadline && submissionDeadline < currentDate) {
      return "past";
    } else {
      return "current";
    }
  };

  const filteredHackathons = hackathons?.filter(
    (hackathon) =>
      getStatus(hackathon.submissionDeadline) === activeTab &&
      (hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.theme?.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const getStatusIcon = (submissionDeadline: Date | null) => {
    const currentDate = new Date();

    if (submissionDeadline && submissionDeadline > currentDate) {
      return <Clock className="h-5 w-5 text-blue-400" />;
    } else if (submissionDeadline && submissionDeadline < currentDate) {
      return <Trophy className="h-5 w-5 text-green-400" />;
    } else {
      return <History className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHackathons.map((hackathon) => (
          <Link
            key={hackathon.id}
            href={`/hackathon/${hackathon.id}`}
            className="block rounded-lg border border-gray-700 bg-gray-800 transition-all hover:border-gray-600 hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {getStatusIcon(hackathon.submissionDeadline)}
                    <span className="text-sm font-medium capitalize text-gray-400">
                      {getStatus(hackathon.submissionDeadline)}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-100">
                    {hackathon.title}
                  </h3>
                  <p className="mb-4 text-wrap text-sm text-gray-400">
                    {hackathon.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {hackathon.submissionDeadline?.toLocaleDateString()}
                </div>
                <span>{hackathon.participants}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredHackathons.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-400">No hackathons found</p>
        </div>
      )}
    </div>
  );
}
