// User Model Section

export interface User {
  id: string; // UUID
  email: string;
  username: string;
  password_hash: string;
  is_email_verified: boolean;
  created_at: Date; // ISO date string
  updated_at: Date; // ISO date string
  deleted_at: Date | null; // ISO date string or null
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

// User Model Section Ends

// User Profile Model Section
export interface UserProfile {
  id: string; // UUID
  user_id: string; // UUID
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  date_of_birth: string | null; // ISO date string or null
  created_at: Date; // ISO date string
  updated_at: Date; // ISO date string
}

// User Profile Model Section Ends

// User Email Verification Token Model Section
export interface UserEmailVerificationToken {
  id: string; // UUID
  user_id: string; // UUID
  token: string;
  expires_at: Date; // ISO date string
  created_at: Date; // ISO date string
}

// User Email Verification Token Model Section Ends
