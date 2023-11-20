export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
  fullName: string;
};

export type UpdatePayload = {
  userId: string;
  fullName?: string;
  password?: string;
};

export interface IUserContext {
  isAuthenticated: boolean;
  userId: string;
  username: string;
  fullName: string;
}

export type UserContextType = {
  userState: IUserContext;
  login(payload: LoginPayload): Promise<any>;
  register(payload: RegisterPayload): Promise<any>;
  update(payload: UpdatePayload): Promise<any>;
  logout: any;
};
