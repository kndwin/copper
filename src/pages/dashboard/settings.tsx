import { getDashboardLayout } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";
import { Settings } from "~/features/setting";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Settings />
    </>
  );
};
export default DashboardPage;
DashboardPage.getLayout = getDashboardLayout;
