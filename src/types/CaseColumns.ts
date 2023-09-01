import type { CaseStatus } from "@prisma/client";

export type CaseColumn = {
  created_at: Date;
  case_id: number;
  status: CaseStatus;
  initials: string | null;
  companyId: number;
  enduser_name: string | null;
  external_id: string | null;
  order_id: string;
};
