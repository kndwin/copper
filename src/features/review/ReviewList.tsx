import { Text, Tag, Button, Skeleton } from "~/ui";
import { HiPlus, HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { trpc, type RouterOutputs } from "~/utils/trpc";

export const ReviewList = () => {
  const reviewQuery = trpc.review.getReviewFromUser.useQuery();
  const hasReviews = Number(reviewQuery.data?.length) > 0;

  return (
    <>
      <div className="flex justify-between">
        <Text className="text-2xl font-bold">Reviews</Text>
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
        {reviewQuery.status === "loading" && <LoadingReviews />}
        {reviewQuery.status === "success" && hasReviews && (
          <div className="flex flex-col gap-4">
            {reviewQuery.data?.map((review) => (
              <Review key={review.id} data={review} />
            ))}
          </div>
        )}
        {reviewQuery.status === "success" && !hasReviews && <EmptyReviews />}
      </div>
    </>
  );
};

type TReviewProps = {
  data: RouterOutputs["review"]["getReviewFromUser"][number];
};
const Review = ({ data }: TReviewProps) => {
  return (
    <Link href={`/dashboard/review/${data.id}`}>
      <div className="cursor-point flex items-center justify-between rounded border border-sand-6 bg-sand-2 px-6 py-4 hover:bg-sand-4">
        <div className="flex items-center gap-4">
          <HiOutlineMenuAlt2 />
          <Text className="text-lg font-bold">{data.title}</Text>
        </div>
        <div>
          <Tag>{data.status}</Tag>
        </div>
      </div>
    </Link>
  );
};

const EmptyReviews = () => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-sand-6 p-8 text-center">
      <HiOutlineMenuAlt2 className="h-12 w-12 rounded-full bg-sand-4 p-2" />
      <Text className="text-xl font-bold">No Reviews posted</Text>
      <Text>You don't have any reviews yet. Start reviewing</Text>
      <Button
        as={Link}
        href="/dashboard/review/new"
        variant="outline"
        className="w-fit"
        size="lg"
      >
        <HiPlus />
        New Review
      </Button>
    </div>
  );
};

const LoadingReviews = () => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-20 w-full" />
  </div>
);
