"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  name: string;
  count: number;
};

export const StoreCard = ({ name, count }: Props) => {
  return (
    <Card
      className={cn(
        "w-auto bg-transparent h-[120px] transition-all duration-300 ease-linear"
      )}
    >
      <CardHeader>
        <CardTitle className="dark:text-white text-black">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none dark:text-white text-black">
                You have bought {count} {count === 1 ? "item" : "items"} from
                this store
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
