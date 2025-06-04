import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Shad } from "./shad";
import Filter from "@/public/icons/filter";
import { useCurrentLocale, useI18n } from "@/locales/client";

export function PopoverDemo({ options, setoptions, tog, settog, setquotes, allquotes }) {

  const t = useI18n();
  const currentLocale = useCurrentLocale();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`flex ${currentLocale == "en" ? "w-[110px] px-6 py-4" : "w-[150px] px-4 py-3 xl:px-6 xl:py-4"
          } gap-4 items-center border border-[#E5EAEF] rounded-[53px]  h-[50px] relative  `}
        >

          <Filter />
          <div className="text-[#16191D] font-Matter font-medium text-[0.9rem]">
            Filter
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={` ${currentLocale == "en" ? "w-48 " : "w-max "} `}>
        <Shad options={options} setoptions={setoptions} tog={tog} settog={settog} accepted={t("p124")} rejected={t("p125")} setquotes={setquotes} allquotes={allquotes} pending={t("p131")} created={t("p24")} reset={t("p277")} apply={t("p278")} />
      </PopoverContent>
    </Popover>
  );
}
