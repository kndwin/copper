import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { ReviewContent, ReviewHeader } from "~/features/review";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";
import { useReviewFormStore } from "~/features/review/Content/useReviewFormStore";
import { CafeDetailsLoadingSkeleton } from "~/features/review/Content/SearchCafe";
import { Skeleton } from "~/ui";
import { useEffect } from "react";

const UpdateReviewPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const setAllFormState = useReviewFormStore((s) => s.setAllFormState);
  const setMode = useReviewFormStore((s) => s.setMode);
  const utils = trpc.useContext();
  const reviewQuery = trpc.review.getReviewFromId.useQuery(
    { id: query?.id as string },
    {
      enabled: Boolean(query?.id),
      onSuccess: (data) => {
        if (data) {
          const { place, ...rest } = data;
          setAllFormState(rest);
          utils.places.getPlaceDetails.setData(() => place);
        }
      },
    }
  );

  useEffect(() => {
    if (query?.id) {
      setMode("update");
    }
  }, [query]);

  return (
    <Page>
      <ReviewHeader />
      <main className="p-4">
        {reviewQuery.isLoading && <LoadingSkeleton />}
        {reviewQuery.isSuccess && <ReviewContent />}
      </main>
    </Page>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <CafeDetailsLoadingSkeleton />
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

export default UpdateReviewPage;
