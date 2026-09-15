import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { fallbackBundle } from "../lib/fallbackData";
import type { ResumeBundle } from "../lib/types";

export function useResumeBundle() {
  const query = useQuery<ResumeBundle>({
    queryKey: ["resume-bundle"],
    queryFn: async () => {
      const { data } = await api.get<ResumeBundle>("/bundle/");
      return data;
    },
    placeholderData: fallbackBundle,
    retry: 0,
  });

  return {
    ...query,
    data: query.data ?? fallbackBundle,
  };
}
