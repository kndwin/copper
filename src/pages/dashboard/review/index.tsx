import Link from "next/link";
import { HiOutlineMenuAlt2, HiPlus } from "react-icons/hi";

import { getDashboardLayout } from "~/features/layout";
import { ReviewList, ReviewLoadingList } from "~/features/review";
import { trpc } from "~/utils/trpc";
import { type NextPageWithLayout } from "~/types/next-app";
import { Text, Button } from "~/ui";
import { EmptyState } from "~/features/common/EmptyState";

const DashboardPage: NextPageWithLayout = () => {
  const reviewQuery = trpc.review.getReviewFromUser.useQuery();
  const hasReviews = Number(reviewQuery.data?.length) > 0;
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <HiOutlineMenuAlt2 />
          <Text className="text-2xl font-bold">Reviews</Text>
        </div>
        <Button
          as={Link}
          href="/dashboard/review/new"
          variant="filled"
          size="lg"
        >
          <HiPlus />
          New Review
        </Button>
      </div>
      <Text className="text-lg leading-8 text-sand-10">
        Create and manage reviews
      </Text>
      <div className="mt-12">
        {reviewQuery.status === "loading" && <ReviewLoadingList />}
        {reviewQuery.status === "success" && (
          <>
            {hasReviews && <ReviewList reviews={reviewQuery.data} />}
            {!hasReviews && (
              <EmptyState
                ctaLabel="New Review"
                ctaHref="/dashboard/review/new"
                icon={<HiOutlineMenuAlt2 />}
                title="No Reviews posted"
                description="You don't have any reviews yet. Start reviewing"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
DashboardPage.getLayout = getDashboardLayout;
