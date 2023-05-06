"use client";

import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { Button } from "./button";
import { useToast } from "./use-toast";

const SignOutButton: FC = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut({
        callbackUrl: `${window.location.origin}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
