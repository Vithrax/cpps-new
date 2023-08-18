export type Order = {
  id: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  client: number;
  internalId: string;
  externalId: string;
  email: string;
  age: number;
};
