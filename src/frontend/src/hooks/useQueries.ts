import { useQuery } from "@tanstack/react-query";
import type { MenuItem } from "../backend.d";
import { useActor } from "./useActor";

export function useGetMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}
