"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tool = ({ svg, msg }) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{svg}</TooltipTrigger>
          <TooltipContent>
            <p>{msg}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Tool;
