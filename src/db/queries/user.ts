import { Pool } from "pg";
import { logger } from "../../external";
import { User, UserEmailVerificationToken, UserProfile } from "../models";

export const generateUserQueries = (conection: Pool) => {
  logger.info("Generating Queries for Portfolio Collection");

  return Object.freeze({
    // User Queries
    findUserById: async (id: string): Promise<User | null> => {
      const query = `SELECT * FROM users WHERE id = $1`;
      const result = await conection.query<User>(query, [id]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    findUserByEmail: async (email: string): Promise<User | null> => {
      const query = `SELECT * FROM users WHERE email = $1`;
      const result = await conection.query<User>(query, [email]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    createUser: async (user: User): Promise<User> => {
      const query = `INSERT INTO users (id, email, password_hash, is_email_verified, created_at, updated_at, deleted_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     RETURNING *`;
      const values = [
        user.id,
        user.email,
        user.password_hash,
        user.is_email_verified,
        user.created_at,
        user.updated_at,
        user.deleted_at,
      ];
      const result = await conection.query<User>(query, values);

      return result.rows[0];
    },
    // User Profile Queries
    findUserProfileByUserId: async (
      userId: string
    ): Promise<UserProfile | null> => {
      const query = `SELECT * FROM user_profiles WHERE user_id = $1`;
      const result = await conection.query<UserProfile>(query, [userId]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    // User Email Verification Token Queries
    findEmailVerificationToken: async (
      userId: string,
      token: string
    ): Promise<UserEmailVerificationToken | null> => {
      const query = `SELECT * FROM email_verification_tokens WHERE user_id = $1 AND token = $2`;
      const result = await conection.query<UserEmailVerificationToken>(query, [
        userId,
        token,
      ]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
  });
};
