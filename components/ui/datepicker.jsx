"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCurrentLocale, useI18n } from "@/locales/client";

export function DatePicker({ dedlinedate, idx, olddate }) {
  const [date, setDate] = useState(olddate);
  useEffect(() => {
    dedlinedate(date, idx);
    //console.log(date, "kkkkkkkkk");
  }, [date]);
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <Popover className={" relative  z-[1000000000]  "}>
      <PopoverTrigger className="  " asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-between w-full text-[0.95rem] text-left font-normal h-full ",
            !date && "text-muted-foreground"
          )}
        >
          {date != null
            ? format(date, "PPP")
            : olddate || <span className=" text-[#AFB2B6] ">{t("p102")}</span>}
          <CalendarIcon className="mr-2 h-3.5 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={olddate}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
