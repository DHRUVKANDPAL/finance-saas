import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const useConfirm = (title: string, message: string) :[()=>JSX.Element,()=>Promise<unknown>]=> {
  const [promise, setpromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setpromise({ resolve });
    });
  const handleClose = () => {
    setpromise(null);
  };
  const handleconfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handlecancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const Confirmation = () => {
    return (
      <Dialog open={promise !== null} onOpenChange={handlecancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handlecancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleconfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  return [Confirmation, confirm];
};
