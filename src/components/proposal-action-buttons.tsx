"use client";

import { FC } from "react";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ProposalReplyRequest } from "@/lib/validators/proposal-action";
import { onMutationError } from "@/utils/mutation-error";
import type { Session } from "next-auth";
import type { Proposal } from "@prisma/client";

interface ProposalActionButtonsProps {
  session: Session;
  proposal: Proposal;
}

const ProposalActionButtons: FC<ProposalActionButtonsProps> = ({
  session,
  proposal: { status, proposal_id },
}) => {
  const router = useRouter();

  // user types
  const isOperator = session.user.permission === "operator";
  const isClient = session.user.permission === "client";

  // scenarios
  const canReply = status === "pending" && isClient;
  const canCancel = status === "pending" && isOperator;
  const viewOnly = !canReply && !canCancel;

  const { mutate: replyToProposal, isLoading: isReplying } = useMutation({
    mutationFn: async ({ action }: ProposalReplyRequest) => {
      const payload: ProposalReplyRequest = { action };

      const { data } = await axios.patch(
        `/api/proposal/${proposal_id}`,
        payload
      );
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Proposal status has been changed",
      });

      router.refresh();
    },
  });

  return (
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={router.back}>
        Back
      </Button>
      {viewOnly && <Button disabled>No actions available.</Button>}
      {canCancel && (
        <Button
          variant="destructive"
          onClick={() => replyToProposal({ action: "cancelled" })}
          isLoading={isReplying}
        >
          Cancel
        </Button>
      )}
      {canReply && (
        <>
          <Button
            className="ml-auto mr-2"
            variant="softDestructive"
            isLoading={isReplying}
            onClick={() => replyToProposal({ action: "rejected" })}
          >
            Reject
          </Button>
          <Button
            isLoading={isReplying}
            onClick={() => replyToProposal({ action: "accepted" })}
          >
            Accept
          </Button>
        </>
      )}
    </CardFooter>
  );
};

export default ProposalActionButtons;
