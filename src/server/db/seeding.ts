"use server"

import { db } from "@/server/db/index";
import { hackathons_table } from "@/server/db/schema";

export async function hackathonSeed() {
  await db.insert(hackathons_table).values([
    {
      id: 1,
      title: "AI Innovation Challenge",
      description: "Create innovative AI solutions for real-world problems",
      theme: "Artificial Intelligence",
      objectives:
        "Develop AI-driven applications to solve real-world challenges.",
      guidelines: "Follow ethical AI practices and ensure data privacy.",
      startDate: new Date("2024-03-15"),
      endDate: new Date("2024-03-17"),
      submissionDeadline: new Date("2024-03-10"),
      createdBy: 1,
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      description: "Building the future of decentralized applications",
      theme: "Blockchain",
      objectives:
        "Create decentralized applications using blockchain technology.",
      guidelines: "Ensure transparency and security in your applications.",
      startDate: new Date("2024-04-05"),
      endDate: new Date("2024-04-07"),
      submissionDeadline: new Date("2024-04-01"),
      createdBy: 1,
    },
    {
      id: 3,
      title: "Green Tech Challenge",
      description: "Developing sustainable technology solutions",
      theme: "Sustainability",
      objectives:
        "Create tech solutions that promote sustainability and reduce carbon footprint.",
      guidelines: "Focus on eco-friendly practices and solutions.",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-03"),
      submissionDeadline: new Date("2024-01-28"),
      createdBy: 1,
    },
  ]).execute();
  console.log("Hackathon data seeded successfully");
}
