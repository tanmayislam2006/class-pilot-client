"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, MoreHorizontal, ShieldOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminQueryKeys } from "@/queries/admin";

interface UpdateUserStatusActionProps {
  userId: string;
  currentStatus: string;
}

export default function UpdateUserStatusAction({
  userId,
  currentStatus,
}: UpdateUserStatusActionProps) {
  const queryClient = useQueryClient();

  const { mutate: updateStatusMutation, isPending } = useMutation({
    mutationFn: async (newStatus: "ACTIVE" | "BLOCKED") => {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { status: newStatus } }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update user status");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.teachers });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.students });
      toast.success("User status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to update user status");
    },
  });

  const isActive = currentStatus.toUpperCase() === "ACTIVE";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
          <span className="sr-only">Open menu</span>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(userId)}>
          <Copy className="mr-2 h-4 w-4" />
          Copy User ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isActive ? (
          <DropdownMenuItem onClick={() => updateStatusMutation("BLOCKED")}>
            <ShieldOff className="mr-2 h-4 w-4" />
            Block User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => updateStatusMutation("ACTIVE")}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Activate User
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
