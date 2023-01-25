export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  instagram?: string;
  phone?: string;
  title?: string;
  birth?: number;
  gender?: string;
  province?: string;
  state?: string;
  country?: string;
  passport_number?: string;
  passport_expiry_date?: number;
  createdAt: number;
  updatedAt: number;
}
