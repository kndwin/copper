import { Text, Button } from "~/ui";
import { HiPlus, HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";

export const ReviewList = () => {
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
        <EmptyReviews />
      </div>
    </>
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
