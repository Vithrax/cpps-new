'use client';

import axios from 'axios';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import OptionSelector from '@/components/option-selector';
import { CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ProposalCreateFormValidator,
  ProposalCreateFormRequest,
  ProposalCreateRequest,
} from '@/lib/validators/proposal-create';
import { toast } from '@/hooks/use-toast';
import { onMutationError } from '@/utils/mutation-error';
import type { User } from 'next-auth';
import type { ProposalOption } from '@prisma/client';

interface ProposalCreateFormProps {
  user: User;
  proposalOptions: Omit<ProposalOption, 'active'>[];
}

type SortedOptions = {
  [category: string]: {
    description: string;
    id: number;
  }[];
};

type SelectedOptionData = {
  left: number[];
  right: number[];
};

const ProposalCreateForm: FC<ProposalCreateFormProps> = ({
  user,
  proposalOptions,
}) => {
  const router = useRouter();
  const form = useForm<ProposalCreateFormRequest>({
    resolver: zodResolver(ProposalCreateFormValidator),
  });

  const [values, setValues] = useState<SelectedOptionData>({
    left: [],
    right: [],
  });

  const addOption = (n: number, side: 'left' | 'right') => {
    setValues((prev) => {
      if (side === 'left') {
        return {
          ...prev,
          left: [...prev.left, n],
        };
      } else {
        return {
          ...prev,
          right: [...prev.right, n],
        };
      }
    });
  };

  const removeOption = (n: number, side: 'left' | 'right') => {
    setValues((prev) => {
      if (side === 'left') {
        return {
          ...prev,
          left: prev.left.filter((v) => v !== n),
        };
      } else {
        return {
          ...prev,
          right: prev.right.filter((v) => v !== n),
        };
      }
    });
  };

  const sortedOptions = proposalOptions.reduce((acc, option) => {
    const category =
      option.category.at(0)?.toUpperCase() + option.category.slice(1);

    if (acc[category]) {
      acc[category].push({
        description: option.description,
        id: option.id,
      });
    } else {
      acc[category] = [
        {
          description: option.description,
          id: option.id,
        },
      ];
    }

    return acc;
  }, {} as SortedOptions);

  const { mutate: createProposal, isLoading } = useMutation({
    mutationFn: async ({ orderId }: ProposalCreateFormRequest) => {
      const payload: ProposalCreateRequest = {
        orderId,
        left_options: values.left,
        right_options: values.right,
      };

      const { data } = await axios.post('/api/proposal/', payload);
      return data;
    },
    onError: onMutationError,
    onSuccess: () => {
      toast({
        description: 'Case created successfully',
      });

      router.push('/proposals/');
      router.refresh();
    },
  });

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id="create-proposal-form"
            onSubmit={form.handleSubmit((e) => createProposal(e))}
          >
            <FormField
              name="orderId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Type here..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Order that proposal refers to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Separator className="my-4" />
        {Object.keys(sortedOptions).map((category) => {
          const options = sortedOptions[category];
          return (
            <div key={category} className="flex justify-between gap-4 mt-2">
              <OptionSelector
                side="left"
                category={category}
                options={options}
                addOption={addOption}
                removeOption={removeOption}
              />
              <OptionSelector
                side="right"
                category={category}
                options={options}
                addOption={addOption}
                removeOption={removeOption}
              />
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() => form.reset()}
          className="ml-auto mr-2"
        >
          Clear
        </Button>
        <Button isLoading={isLoading} form="create-proposal-form">
          Create
        </Button>
      </CardFooter>
    </>
  );
};

export default ProposalCreateForm;
