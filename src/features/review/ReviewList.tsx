import { useToast, Text, Tag, Button, Skeleton } from "~/ui";
import { HiPlus, HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import Link from "next/link";
import { trpc, type RouterOutputs } from "~/utils/trpc";
import { EmptyState } from "../common/EmptyState";

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
        {reviewQuery.status === "loading" && (
          <div className="flex flex-col gap-4">
            {[...Array(5).keys()].map((index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        )}
        {reviewQuery.status === "success" && hasReviews && (
          <div className="flex flex-col gap-4">
            {reviewQuery.data?.map((review) => (
              <ReviewItem key={review.id} data={review} />
            ))}
          </div>
        )}
        {reviewQuery.status === "success" && !hasReviews && (
          <EmptyState
            ctaLabel="New Review"
            ctaHref="/dashboard/review/new"
            icon={<HiOutlineMenuAlt2 />}
            title="No Reviews posted"
            description="You don't have any reviews yet. Start reviewing"
          />
        )}
      </div>
    </>
  );
};

type TReviewProps = {
  data: RouterOutputs["review"]["getReviewFromUser"][number];
};

const ReviewItem = ({ data }: TReviewProps) => {
  const utils = trpc.useContext();
  const { send } = useToast();
  const deleteOneMutation = trpc.review.deleteOne.useMutation({
    onSuccess: () => {
      utils.places.getManyPlacesWithReviews.invalidate();
      send({
        description: ``,
        title: "Succesfully deleted review",
        type: "success",
      });
    },
  });

  const handleDeleteReview = async ({ id }: { id: string }) => {
    deleteOneMutation.mutateAsync({ id });
  };

  return (
    <Link href={`/dashboard/review/${data.id}`}>
      <div className="cursor-point group relative flex items-center justify-between rounded border border-sand-6 bg-sand-2 px-6 py-4 hover:bg-sand-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <HiOutlineMenuAlt2 />
            <Text className="text-lg font-bold">{data.title}</Text>
          </div>
          <div className="mt-2 rounded-sm bg-sand-3 py-2 px-4">
            <Text className="text-lg font-bold">{data.place.name}</Text>
            <Text className="text-sm">{data.place.formattedAddress}</Text>
          </div>
        </div>
        <div>
          <Tag>{data.status}</Tag>
        </div>
        <div className="invisible absolute top-0 right-[100%] flex h-full flex-col px-4 group-hover:visible">
          <div
            className="h-8 w-8 rounded-full bg-red-4 p-2 "
            onClick={() => handleDeleteReview({ id: data.id })}
          >
            <HiArchiveBoxXMark className="" />
          </div>
        </div>
      </div>
    </Link>
  );
};
