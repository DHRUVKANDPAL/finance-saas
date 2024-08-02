"use client";
type Props = {
  id: string;
};
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash, Trash2 } from "lucide-react";

export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();
  const deletemutation = useDeleteAccount(id);
  const [Confirmation, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );
  return (
    <>
      <Confirmation/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            onClick={async () => {
              const ok = await confirm();
              if (ok) deletemutation.mutate();
            }}
          >
            <Trash2 className="size-4 mr-2"></Trash2>Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
