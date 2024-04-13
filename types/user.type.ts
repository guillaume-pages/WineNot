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