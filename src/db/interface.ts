import { Pool } from "pg";
import { generateUserQueries } from "./queries";

export type DBClient = {
  connection: Pool | null;
  userQueries: ReturnType<typeof generateUserQueries> | null;
};
