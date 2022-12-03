import { Page } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { NewReview, NewReviewHeader } from "~/features/review/NewReview";

const NewReviewPage: NextPageWithLayout = () => {
  return <NewReview />;
};
export default NewReviewPage;

NewReviewPage.getLayout = (page) => (
  <Page>
    <NewReviewHeader />
    <main className="p-4">{page}</main>
  </Page>
);
