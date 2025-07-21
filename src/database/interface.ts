import { Pool } from "pg";
import { generateUserQueries } from "./queries";

export type DBClient = {
  connection: Pool;
  userQueries: ReturnType<typeof generateUserQueries>;
  transaction: (callback: () => Promise<void>) => Promise<void>;
};
