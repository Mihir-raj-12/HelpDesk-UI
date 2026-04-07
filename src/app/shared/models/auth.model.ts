export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  fullName: string;
  email: string;
  role : string;
  expiresAt: string;
}

export interface UserTokenDate {
    nameid: string;
    email: string;
    name : string;
    role : string;
    exp: number;
}