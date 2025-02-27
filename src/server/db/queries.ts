import { hackathons_table as hackathonSchema } from "@/server/db/schema";
import { db } from "@/server/db/index";

export const QUERIES = {
  getAllHackathons: function () {
    return db.select().from(hackathonSchema);
  }


};
