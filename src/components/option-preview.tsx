"use client";

import type { FC } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface OptionPreviewProps {
  category: string;
  options: { description: string }[];
}

const OptionPreview: FC<OptionPreviewProps> = ({ category, options }) => {
  return (
    <div className="w-full py-2 px-3 border border-border rounded-md">
      <Label className="font-semibold">{category}</Label>
      {options.map(({ description }) => {
        return (
          <div key={description} className="flex items-center gap-1 mb-1">
            <Checkbox disabled checked />
            <Label>{description}</Label>
          </div>
        );
      })}
    </div>
  );
};

export default OptionPreview;
