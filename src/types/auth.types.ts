export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  status: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
};

export type LoginData = {
  token: string;
  accessToken: string;
  refreshToken: string;
  redirect: boolean;
  user: AuthUser;
};