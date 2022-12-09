import { getDashboardLayout } from "~/features/layout";
import { ReviewList } from "~/features/review";
import { type NextPageWithLayout } from "~/types/next-app";

const DashboardPage: NextPageWithLayout = () => {
  return <ReviewList />;
};

export default DashboardPage;
DashboardPage.getLayout = getDashboardLayout;
