"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

import { cn } from "../";
import { Button } from "../button";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";

interface ContentLockProps {
  bgColor?: string;
  isPaying: boolean;
  children: React.ReactNode;
}

const Redirect: React.FC = () => (
  <div className="p-6 text-center">
    <h2 className="mb-4 text-2xl font-bold">Unlock Premium Content</h2>
    <p className="mb-6 text-lg">
      Subscribe to our premium plan to access this content and much more!
    </p>
    <Button className="mx-auto w-full max-w-xs">Subscribe Now</Button>
  </div>
);

const ContentLock: React.FC<ContentLockProps> = ({
  bgColor = "bg-gray-100",
  isPaying = "false",
  children,
}) => {
  const [open, setOpen] = useState(false);

  // If the user is a paying subscriber, display the content directly
  if (isPaying) {
    return <>{children}</>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center py-10">
          <div className={cn("rounded-lg px-6 py-3", bgColor)}>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center"
              onClick={() => setOpen(true)}
            >
              <Lock className="mr-2 h-5 w-5" />
              Unlock Content
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="mx-auto max-w-md bg-white">
        <Redirect />
      </DialogContent>
    </Dialog>
  );
};

export default ContentLock;
