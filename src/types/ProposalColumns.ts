import type { Proposal } from "@prisma/client";
import type { Order } from "@prisma/client";
import type { User } from "@prisma/client";

export type ProposalColumn = Pick<
  Order,
  "companyId" | "external_id" | "order_id"
> &
  Pick<Proposal, "proposal_id" | "status" | "created_at"> &
  Pick<User, "initials">;
