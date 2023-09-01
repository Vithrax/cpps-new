"use client";

import { Session } from "next-auth";
import { FC } from "react";
import { Proposal } from "@prisma/client";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { ProposalReplyRequest } from "@/lib/validators/proposal-action";

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
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          return toast({
            title: "Unauthorized",
            description: "You are not authorized to perform this action!",
            variant: "destructive",
          });
        }

        if (error.response?.status == 404) {
          return toast({
            title: "Proposal not found",
            description:
              "Server could not found given proposal, please check id",
            variant: "destructive",
          });
        }

        if (error.response?.status == 409) {
          return toast({
            title: "Not possible",
            description: "Not possible to reply to this proposal!",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Could not reply to proposal, please try again later!",
        variant: "destructive",
      });
    },
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
