import {
  text,
  bigint,
  index,
  singlestoreTableCreator,
  datetime,
  timestamp,
  SingleStoreTableFn,
  SingleStoreTableWithColumns,
} from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator(
  (tableName) => `hackaton_manager_${tableName}`,
);

export const users_table = createTable(
  "users",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (users) => {
    return [
      index("hackathon_manager_users_email").on(users.email),
      index("hackathon_manager_users_role").on(users.role),
      index("hackathon_manager_users_name").on(users.name),
    ];
  },
);

export type DB_UserType = typeof users_table.$inferSelect;

export const hackathons_table = createTable("hackathons", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  theme: text("theme"),
  objectives: text("objectives"),
  guidelines: text("guidelines"),
  startDate: datetime("start_date").notNull(),
  endDate: datetime("end_date").notNull(),
  submissionDeadline: datetime("submission_deadline"),
  participants: bigint("participants", { mode: "number" }).default(0),
  createdBy: bigint("created_by", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
}, (hackathons) => {
  return [
    index("hackathon_manager_hackathons_title").on(hackathons.title),
    index("hackathon_manager_hackathons_created_by").on(hackathons.createdBy),
    index("hackathon_manager_hackathons_start_date").on(hackathons.startDate),
    index("hackathon_manager_hackathons_end_date").on(hackathons.endDate),
    index("hackathon_manager_hackathons_submission_deadline").on(hackathons.submissionDeadline),
  ];
});

export type DB_HackathonType = typeof hackathons_table.$inferSelect;

export const submissions_table = createTable(
  "submissions",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    hackathonId: bigint("hackathon_id", { mode: "number" }).notNull(),
    userId: bigint("user_id", { mode: "number" }),
    submissionUrl: text("submission_url").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (submissions) => {
    return [
      index("hackathon_manager_submissions_hackathon_id").on(submissions.hackathonId),
      index("hackathon_manager_submissions_user_id").on(submissions.userId),
    ];
  }
);

export type DB_SubmissionType = typeof submissions_table.$inferSelect;

