export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserWithoutPassword {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}
