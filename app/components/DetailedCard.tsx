import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PostType } from "../../lib/types/Post";
import { Download } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import { SheetDemo } from "./Sheet";
import { DeletePost } from "./DeletePost";
import { storage } from "../firebase-config";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

export const DetailedCard = ({
  id,
  createdAt,
  date,
  expiryDate,
  period,
  product,
  store,
  type,
  userId,
  picture,
}: PostType) => {
  const [progress, setProgress] = useState(10);

  const completeDiff = differenceInDays(parseISO(expiryDate), parseISO(date));
  const presentDiff = differenceInDays(parseISO(expiryDate), new Date());
  const diff = 100 - Math.floor((presentDiff / completeDiff) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(diff), 500);
    return () => clearTimeout(timer);
  }, [diff]);

  const titles = [
    {
      title: `You've bought this on ${format(parseISO(date), "PP")}`,
    },
    {
      title: `This product's warranty is ${period} ${type} and it's gonna expire on ${format(
        parseISO(expiryDate),
        "PP"
      )}`,
    },
    {
      title: `You bought this product from ${store}`,
    },
    {
      title: `${presentDiff} Days Left`,
    },
  ];

  const handleDownload = async () => {
    try {
      const url = await getDownloadURL(
        storageRef(storage, `clientReceipts/${picture}`)
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = picture;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="dark:text-white text-black">{product}</CardTitle>
        <CardDescription>
          Created on {format(parseISO(createdAt), "PP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {titles.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none dark:text-white text-black">
                  {notification.title}
                </p>
              </div>
            </div>
          ))}
          <Progress value={progress} className="w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Receipt
        </Button>
      </CardFooter>
      <CardFooter>
        <SheetDemo
          id={id}
          date={date}
          expiryDate={expiryDate}
          period={period}
          product={product}
          store={store}
          Type={type}
          picture={picture}
        />
      </CardFooter>
      <CardFooter>
        <DeletePost id={id} picture={picture} />
      </CardFooter>
    </>
  );
};
