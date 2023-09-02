"use client";

import axios from "axios";
import { type FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CaseReplyRequest } from "@/lib/validators/case-reply";
import { onMutationError } from "@/utils/mutation-error";
import type { Session } from "next-auth";
import type { Case } from "@prisma/client";

interface CaseActionButtonsProps {
  session: Session;
  caseData: Case;
}

const CaseActionButtons: FC<CaseActionButtonsProps> = ({
  session,
  caseData,
}) => {
  const router = useRouter();
  const [replyText, setReplyText] = useState("");

  const {
    user: { permission },
  } = session;

  // reply for client
  const { mutate: sendReply, isLoading: isSendingReply } = useMutation({
    // this time no arguments, we get text from state and id from props
    mutationFn: async () => {
      const payload: CaseReplyRequest = {
        replyText,
        case_id: caseData.case_id,
      };

      const { data } = await axios.post("/api/case/reply", payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Reply successfully sent.",
      });

      router.refresh();
    },
  });

  // cancel case for operator
  const { mutate: cancelCase, isLoading: isCancellingCase } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/case/${caseData.case_id}`);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Case has been canceled.",
      });

      router.refresh();
    },
  });

  // finish case for operator
  const { mutate: finishCase, isLoading: isFinishingCase } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/case/${caseData.case_id}`);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: "Case has been finished.",
      });

      router.refresh();
    },
  });

  // user type
  const isOperator = permission === "operator";
  const isClient = permission === "client";

  // scenarios
  const canReply = isClient && caseData.status === "pending";
  const canCancel = isOperator && caseData.status === "pending";
  const canFinish = isOperator && caseData.status === "answered";
  const noAction = !canReply && !canCancel && !canFinish;

  return (
    <>
      <Button variant="outline" onClick={router.back}>
        Back
      </Button>
      {noAction && <Button disabled>No actions available</Button>}
      {canCancel && (
        <Button
          disabled={caseData.status !== "pending"}
          variant="destructive"
          onClick={() => cancelCase()}
          isLoading={isCancellingCase}
        >
          Cancel case
        </Button>
      )}
      {canFinish && (
        <Button onClick={() => finishCase()} isLoading={isFinishingCase}>
          Finish case
        </Button>
      )}
      {canReply && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Reply</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reply</DialogTitle>
              <DialogDescription>
                Please read the question carefully and make sure your answer
                will clear all the confusion.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Type your reply here..."
              className="min-h-[200px]"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={replyText.length === 0}
                onClick={() => sendReply()}
                isLoading={isSendingReply}
              >
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CaseActionButtons;
