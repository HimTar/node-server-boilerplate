import { Pool } from "pg";
import { logger } from "../../lib";
import { User, UserEmailVerificationToken, UserProfile } from "../models";
import { UserRefreshToken } from "../models/user";
import { TABLES } from "../tables";

export const generateUserQueries = (conection: Pool) => {
  logger.info(
    "Generating Queries for User, UserProfile, UserEmailVerificationToken Models"
  );

  return Object.freeze({
    // User Queries
    findUserById: async (id: string): Promise<User | null> => {
      const query = `SELECT * FROM "${TABLES.USER}" WHERE id = $1`;
      const result = await conection.query<User>(query, [id]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    findUserByUsername: async (username: string): Promise<User | null> => {
      const query = `SELECT * FROM "${TABLES.USER}" WHERE username = $1`;
      const result = await conection.query<User>(query, [username]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    findUserByEmail: async (email: string): Promise<User | null> => {
      const query = `SELECT * FROM "${TABLES.USER}" WHERE email = $1`;
      const result = await conection.query<User>(query, [email]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    createUser: async (user: User): Promise<User> => {
      const query = `INSERT INTO "${TABLES.USER}" (id, username, email, password_hash, is_email_verified, created_at, updated_at, deleted_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                     RETURNING *`;
      const values = [
        user.id,
        user.username,
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
      const query = `SELECT * FROM "${TABLES.USER_PROFILE}" WHERE user_id = $1`;
      const result = await conection.query<UserProfile>(query, [userId]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    createUserProfile: async (profile: UserProfile): Promise<UserProfile> => {
      const query = `INSERT INTO "${TABLES.USER_PROFILE}" (id, user_id, full_name, bio, avatar_url, date_of_birth, created_at, updated_at)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                     RETURNING *`;
      const values = [
        profile.id,
        profile.user_id,
        profile.full_name,
        profile.bio,
        profile.avatar_url,
        profile.date_of_birth,
        profile.created_at,
        profile.updated_at,
      ];
      const result = await conection.query<UserProfile>(query, values);
      return result.rows[0];
    },
    // User Email Verification Token Queries
    findEmailVerificationToken: async (
      userId: string,
      token: string
    ): Promise<UserEmailVerificationToken | null> => {
      const query = `SELECT * FROM "${TABLES.EMAIL_VERIFICATION_TOKEN}" WHERE user_id = $1 AND token = $2`;
      const result = await conection.query<UserEmailVerificationToken>(query, [
        userId,
        token,
      ]);

      return result.rows.length > 0 ? result.rows[0] : null;
    },
    createEmailVerificationToken: async (
      token: UserEmailVerificationToken
    ): Promise<UserEmailVerificationToken> => {
      const query = `INSERT INTO "${TABLES.EMAIL_VERIFICATION_TOKEN}" (id, user_id, token, expires_at, created_at)
                     VALUES ($1, $2, $3, $4, $5)
                     RETURNING *`;
      const values = [
        token.id,
        token.user_id,
        token.token,
        token.expires_at,
        token.created_at,
      ];
      const result = await conection.query<UserEmailVerificationToken>(
        query,
        values
      );

      return result.rows[0];
    },
    // User Refresh Token Queries
    findLiveRefreshTokenByUserId: async (
      userId: string
    ): Promise<string | null> => {
      const query = `SELECT token FROM "${TABLES.USER_REFRESH_TOKEN}" WHERE user_id = $1 AND revoked_at IS NULL`;
      const result = await conection.query<{ token: string }>(query, [userId]);

      return result.rows.length > 0 ? result.rows[0].token : null;
    },
    createRefreshToken: async (
      userRefreshToken: UserRefreshToken
    ): Promise<void> => {
      const query = `INSERT INTO "${TABLES.USER_REFRESH_TOKEN}" (id, user_id, refresh_token, created_at, expires_at, revoked_at)
                     VALUES ($1, $2, $3, $4, $5, $6)`;
      const values = [
        userRefreshToken.id,
        userRefreshToken.user_id,
        userRefreshToken.refresh_token,
        userRefreshToken.created_at,
        userRefreshToken.expires_at,
        userRefreshToken.revoked_at,
      ];
      await conection.query(query, values);
    },
    revokeRefreshToken: async (userId: string): Promise<void> => {
      const query = `UPDATE "${TABLES.USER_REFRESH_TOKEN}" SET revoked_at = NOW() WHERE user_id = $1`;
      await conection.query(query, [userId]);
    },
  });
};
