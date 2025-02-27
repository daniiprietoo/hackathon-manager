"use server";

import { hackathonSeed } from "./seeding"
import {QUERIES} from "./queries";

export async function seedDatabase() {
  await hackathonSeed();
}

export async function getHackathons() {
  const hackathons = await QUERIES.getAllHackathons();
  return hackathons;
}
