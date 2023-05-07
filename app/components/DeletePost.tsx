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
import { DeleteIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { storage } from "../firebase-config";
import { ref as storageRef, deleteObject } from "firebase/storage";

type DeleteProp = {
  id: string | undefined;
  picture: string;
};

export function DeletePost({ id, picture }: DeleteProp) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteStorage = async () => {
    try {
      const prevImageRef = storageRef(storage, `clientReceipts/${picture}`);
      await deleteObject(prevImageRef);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    try {
      setIsLoading(true);
      await deleteStorage();
      const success = await axios.delete(`/api/posts/deletePost?id=${id}`);
      if (success) {
        setIsLoading(false);
        toast({
          title: "Success !",
          description: "You have successfully deleted",
        });
        queryClient.invalidateQueries(["posts"]);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          <DeleteIcon className="mr-2 h-4 w-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this content from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button isLoading={isLoading} type="submit" onClick={deletePost}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
