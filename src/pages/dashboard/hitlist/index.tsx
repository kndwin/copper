import { HiStar } from "react-icons/hi";
import { EmptyState } from "~/features/common/EmptyState";
import { getDashboardLayout } from "~/features/layout";
import { type NextPageWithLayout } from "~/types/next-app";

const HitlistPage: NextPageWithLayout = () => {
  return (
    <div>
      <EmptyState
        ctaLabel="New Hitlist"
        ctaHref="/dashboard/hitlist/new"
        icon={<HiStar />}
        title="No Hitlist posted"
        description="You don't have any hitlist yet. Create your first one!"
      />
    </div>
  );
};

export default HitlistPage;
HitlistPage.getLayout = getDashboardLayout;
