"use client";

import type { FC } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface OptionSelectorProps {
  category: string;
  readOnly?: boolean;
  side: "left" | "right";
  addOption: (n: number, side: "left" | "right") => void;
  removeOption: (n: number, side: "left" | "right") => void;
  options: {
    description: string;
    id: number;
  }[];
}

const OptionSelector: FC<OptionSelectorProps> = ({
  category,
  options,
  side,
  readOnly = false,
  addOption,
  removeOption,
}) => {
  const handleChange = (id: number, checked: CheckedState) => {
    if (checked) {
      addOption(id, side);
    } else {
      removeOption(id, side);
    }
  };

  return (
    <div className="w-full py-2 px-3 border border-border rounded-md">
      <Label className="font-semibold">{category}</Label>
      {options.map((option) => {
        const id = side + "-option-" + option.id;

        return (
          <div key={option.id} className="flex items-center gap-1 mb-1">
            <Checkbox
              id={id}
              value={option.id}
              disabled={readOnly}
              onCheckedChange={(e) => handleChange(+option.id, e)}
            />
            <Label htmlFor={id}>{option.description}</Label>
          </div>
        );
      })}
    </div>
  );
};

export default OptionSelector;
