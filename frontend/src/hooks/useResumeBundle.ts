import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { fallbackBundle } from "../lib/fallbackData";
import type { ResumeBundle } from "../lib/types";

export function useResumeBundle() {
  return useQuery<ResumeBundle>({
    queryKey: ["resume-bundle"],
    queryFn: async () => {
      const { data } = await api.get<ResumeBundle>("/bundle/");
      return data;
    },
    placeholderData: fallbackBundle,
    retry: 0,
  });
}
