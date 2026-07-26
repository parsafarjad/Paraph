"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { login } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getRequestErrorMessage } from "@/shared/lib/api/response";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: login,
    onSuccess: async (tokens) => {
      setTokens(tokens);
      await queryClient.invalidateQueries();
      toast.success("ورود با موفقیت انجام شد.");
      router.replace("/");
    },
    onError: (error) => {
      toast.error(getRequestErrorMessage(error, "ورود ناموفق بود. اطلاعات را بررسی کنید."));
    },
  });
}
