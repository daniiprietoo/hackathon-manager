"use server"

import { hackathonSeed } from "./seeding"

export async function seedDatabase() {
  await hackathonSeed();
}