import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getObject, updateObject } from "@/services/objects";
import { WorkspaceObject } from "@/modules/pages/types";
import { Block } from "@/modules/blocks/types";
import { useDebouncedCallback } from "./useDebouncedCallback";

export function useObject(id: string) {
  const queryClient = useQueryClient();
  const queryKey = ["object", id];

  const query = useQuery({
    queryKey,
    queryFn: () => getObject(id),
    enabled: Boolean(id),
  });

  const mutation = useMutation({
    mutationFn: (patch: Partial<Pick<WorkspaceObject, "title" | "icon" | "properties" | "blocks">>) =>
      updateObject(id, patch),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKey, updated);
    },
  });

  // Persisted 500ms after the user stops typing/editing — avoids a
  // network request on every keystroke while still feeling "live".
  const saveDebounced = useDebouncedCallback(
    (patch: Partial<Pick<WorkspaceObject, "title" | "icon" | "properties" | "blocks">>) => {
      mutation.mutate(patch);
    },
    500
  );

  const setTitle = (title: string) => {
    queryClient.setQueryData(queryKey, (prev: WorkspaceObject | null | undefined) =>
      prev ? { ...prev, title } : prev
    );
    saveDebounced({ title });
  };

  const setProperty = (key: string, value: string | string[] | null) => {
    queryClient.setQueryData(queryKey, (prev: WorkspaceObject | null | undefined) =>
      prev ? { ...prev, properties: { ...prev.properties, [key]: value } } : prev
    );
    saveDebounced({ properties: { ...(query.data?.properties ?? {}), [key]: value } });
  };

  const setBlocks = (blocks: Block[]) => {
    queryClient.setQueryData(queryKey, (prev: WorkspaceObject | null | undefined) =>
      prev ? { ...prev, blocks } : prev
    );
    saveDebounced({ blocks });
  };

  return {
    object: query.data,
    isLoading: query.isLoading,
    error: query.error,
    setTitle,
    setProperty,
    setBlocks,
    isSaving: mutation.isPending,
  };
}
