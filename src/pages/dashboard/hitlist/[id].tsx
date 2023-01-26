import { useEffect } from "react";

import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { HitlistHeader, HitlistContent } from "~/features/hitlist";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";
import { Skeleton } from "~/ui";
import { useHitlistFormStore } from "~/features/hitlist";

const UpdateHitlistPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const setAllFormState = useHitlistFormStore((s) => s.setAllFormState);
  const formData = useHitlistFormStore((s) => s.formData);
  const setMode = useHitlistFormStore((s) => s.setMode);
  // const utils = trpc.useContext();
  const hitlistQuery = trpc.hitlist.getHitlistFromId.useQuery(
    { id: query?.id as string },
    {
      enabled: Boolean(query?.id),
      onSuccess: (data) => {
        if (data && formData.id === "") {
          setAllFormState(data);
        }
      },
    }
  );

  useEffect(() => {
    if (query?.id) {
      setMode("update");
    }
  }, [query, setMode]);

  return (
    <Page>
      <HitlistHeader />
      <main className="p-4">
        {hitlistQuery.isLoading && <LoadingSkeleton />}
        {hitlistQuery.isSuccess && <HitlistContent />}
      </main>
    </Page>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
      <div className="flex w-full gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex w-full gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
};

export default UpdateHitlistPage;
