import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listObjects, createObject, deleteObject } from "@/services/objects";
import { ObjectType, WorkspaceObject } from "@/modules/pages/types";

export function useObjectList(type: ObjectType) {
  const queryClient = useQueryClient();
  const queryKey = ["objects", type];

  const query = useQuery({
    queryKey,
    queryFn: () => listObjects(type),
  });

  const createMutation = useMutation({
    mutationFn: (
      defaults: Partial<Pick<WorkspaceObject, "title" | "icon" | "properties" | "blocks">>
    ) => createObject(type, defaults),
    onSuccess: (created) => {
      queryClient.setQueryData(queryKey, (prev: WorkspaceObject[] | undefined) => [
        created,
        ...(prev ?? []),
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteObject(id),
    onSuccess: (_void, id) => {
      queryClient.setQueryData(queryKey, (prev: WorkspaceObject[] | undefined) =>
        (prev ?? []).filter((o) => o.id !== id)
      );
    },
  });

  return {
    objects: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    remove: deleteMutation.mutate,
  };
}
