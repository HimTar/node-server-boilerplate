import { Pool } from "pg";
import { Config } from "../config";
import { DBClient } from "./interface";
import { logger } from "../external";
import { generateUserQueries } from "./queries";

export const dbClient: DBClient = {
  connection: undefined!,
  userQueries: undefined!,
  transaction: async (callback) => {
    if (!dbClient.connection) {
      throw new Error("Database connection is not established");
    }
    const client = dbClient.connection;
    try {
      await client.query("BEGIN");
      await callback();
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  },
};

let pool: Pool | null = null;

export async function pingDatabase(pool: Pool): Promise<boolean> {
  try {
    const { rows } = await pool.query("SELECT 1 AS ok");
    return rows[0]?.ok === 1;
  } catch (err) {
    logger.error("Database ping failed", err);
    return false;
  }
}

export const makeDatabaseConnection = async () => {
  if (pool) {
    logger.info("Reusing existing database connection pool");
    return dbClient;
  }

  logger.info("Connecting to database");
  pool = new Pool({
    connectionString: Config.DATABASE_CONNECTION_URL,
    idleTimeoutMillis: 30_000, // close idle clients after 30s
    connectionTimeoutMillis: 10_000, // timeout when acquiring a connection
    ssl: { rejectUnauthorized: false }, // Accept self-signed certs
  });

  try {
    await pool.connect();
    if (!(await pingDatabase(pool))) {
      throw new Error("Database connection failed");
    }
    logger.info("Established Connection to database");

    // Initialize dbClient with the new pool and queries
    dbClient.connection = pool;
    dbClient.userQueries = generateUserQueries(pool);

    return dbClient;
  } catch (err) {
    logger.error("Failed to connect to database", err);
    throw err;
  }
};
