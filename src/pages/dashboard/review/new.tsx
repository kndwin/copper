import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { ReviewContent, ReviewHeader } from "~/features/review";
import { useReviewFormStore } from "~/features/review/Content/useReviewFormStore";
import { useEffect } from "react";

const NewReviewPage: NextPageWithLayout = () => {
  const reset = useReviewFormStore((s) => s.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Page>
      <ReviewHeader />
      <main className="p-4">
        <ReviewContent />
      </main>
    </Page>
  );
};

export default NewReviewPage;
