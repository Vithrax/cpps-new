import type { Role } from "@prisma/client";

export type UserColumns = {
  id: string;
  email: string | null;
  permission_level: Role | null;
  initials: string | null;
  name: string | null;
  UserAccess: {
    companyId: number;
  }[];
};
