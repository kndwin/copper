import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import {
  ReviewContent,
  ReviewHeader,
  useReviewFormStore,
} from "~/features/review";
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
