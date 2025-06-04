"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

export function Shad({
  options,
  setoptions,
  tog,
  settog,
  setquotes,
  allquotes,
  accepted,
  rejected,
  pending,
  created,
  reset,
  apply,
}) {
  const items = [
    {
      id: "one",
      label: accepted,
    },
    {
      id: "two",
      label: rejected,
    },
    {
      id: "three",
      label: pending,
    },
    {
      id: "four",
      label: created,
    },
  ];

  const [checked, setchecked] = useState();
  const FormSchema = z.object({
    items: z.array(z.string()).min(1, ""),
  });
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [], // Updated to start with an empty array
    },
  });
  useEffect(() => {
    //console.log(form, "formmm");
  }, [form]);
  useEffect(() => {
    setchecked(form.watch("items").length === 0);
  }, [form.watch("items")]);
  function onSubmit(data) {
    // Handle the form submission, e.g., send data to the server or display it in a toast
    //console.log("Submitted Data: ", data);
    setoptions(data);
    settog(!tog);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-max">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 w-max">
                <FormLabel className="text-[0.9rem] text-black font-Matter font-medium w-max">
                  Status
                </FormLabel>
                <FormDescription>
                  {/* Select the items you want to display in the sidebar. */}
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, item.id]);
                            } else {
                              field.onChange(
                                field.value.filter((value) => value !== item.id)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-Matter text-[#76828D] font-medium text-[0.875rem]">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2.5">
          <Button
            className="rounded-full px-5 text-black border border-[#E5EAEF] bg-white"
            type="button"
            onClick={() => {
              form.reset({ items: [] }), setquotes(allquotes);
            }}
          >
            {reset}
          </Button>
          <Button
            className={`rounded-full px-[18px] bg-[#1053FF]  text-white ${
              checked == true ? " cursor-not-allowed " : ""
            } `}
            type="submit"
          >
            {apply}
          </Button>
        </div>
      </form>
    </Form>
  );
}
