import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useOpenAccount } from "../hooks/use-open-accounts";
import { useGetAccount } from "../api/use-getsingle-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-accounts";
import { useDeleteAccount } from "../api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountsSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const [Confirmation, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );
  const accountQuery = useGetAccount(id);
  const mutation = useEditAccount(id);
  const deletemutation = useDeleteAccount(id);
  const isLoading = accountQuery.isLoading;
  const isPending = mutation.isPending || deletemutation.isPending;
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  return (
    <>
    <Confirmation/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-12 text-muted-foreground animate-spin"></Loader2>
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
            onDelete={async () => {
              const ok = await confirm();
              if (ok)
                deletemutation.mutate(undefined, {
                  onSuccess: () => {
                    onClose();
                  },
                });
            }}
          />
        )}
      </SheetContent>
    </Sheet>
    </>
  );
  
};
