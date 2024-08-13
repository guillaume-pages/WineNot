export type CreateUser = {
  id: number;
  first_name: string;
  last_name: string | null;
  mail: string;
  password: string;
  phone: string | null;
  status: string | null;
  created_at: Date;
};

export type User = {
  user_id?: string | undefined;
  firstname: string | undefined;
  lastname: string | null | undefined;
  email?: string | undefined;
  phone?: string | null | undefined;
  status?: string | null | undefined;
  created_at?: Date | string | undefined;
  updated_at?: Date | string | undefined | null;
  image?: string | null | undefined;
  email_verified_at?: boolean;
};

export type UserInformation = {
  firstname: string;
  lastname?: string | null;
  email: string;
  phone?: string | null;
  image?: string | null;
  status?: string | null;
  created_at: Date;
  updated_at?: Date | null;
  cellars: object;
}