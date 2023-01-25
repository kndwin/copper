import { useToast, Text, Tag, Button, Skeleton } from "~/ui";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import Link from "next/link";
import { trpc, type RouterOutputs } from "~/utils/trpc";

type ReviewListProps = {
  reviews: RouterOutputs["review"]["getReviewFromUser"];
};

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {reviews?.map((review) => (
        <ReviewItem key={review.id} data={review} />
      ))}
    </div>
  );
};

export const ReviewLoadingList = () => (
  <div className="flex flex-col gap-4">
    {[...Array(5).keys()].map((index) => (
      <Skeleton key={index} className="h-20 w-full" />
    ))}
  </div>
);

type TReviewProps = {
  data: ReviewListProps["reviews"][number];
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
      <div className="cursor-point group relative flex items-center justify-between rounded border border-sand-6 bg-sand-1 px-6 py-4 hover:bg-sand-4">
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
