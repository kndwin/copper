import { styled } from "classname-variants/react";
import { HiChevronDown, HiThumbUp, HiThumbDown } from "react-icons/hi";

import { type RouterOutputs } from "~/utils/trpc";
import { Text, Collapsible, Avatar } from "~/ui";
import { getInitials, getFirstName } from "~/features/layout/utils";

type CollapsibleReviewProps = {
  review: RouterOutputs["review"]["getReviewFromPlace"][number];
};

export const CollapsibleReview = ({ review }: CollapsibleReviewProps) => {
  return (
    <Collapsible>
      <StyledReviewCardTrigger>
        <div className="flex items-center gap-3">
          {review.recommend ? (
            <HiThumbUp className="h-6 w-6 rounded bg-green-5 p-1" />
          ) : (
            <HiThumbDown className="h-6 w-6 rounded bg-red-5 p-1" />
          )}
          <Text className="font-bold">{review.title}</Text>
        </div>
        <div className="mr-8 flex items-center gap-4">
          <Text className="text-sand-10">
            {getFirstName(review?.user?.name)}
          </Text>
          <Avatar>
            <Avatar.Image size="sm" src={review?.user?.image as string} />
            <Avatar.Fallback>{getInitials(review?.user?.name)}</Avatar.Fallback>
          </Avatar>
        </div>
        <StyledChevron />
      </StyledReviewCardTrigger>
      <StyledReviewCardContent>
        <Text>{review.review}</Text>
      </StyledReviewCardContent>
    </Collapsible>
  );
};

const StyledChevron = styled(
  HiChevronDown,
  "absolute right-4 top-6 transform duration-300 ease-in-out group-radix-state-open:rotate-180"
);

const StyledReviewCardTrigger = styled(Collapsible.Trigger, {
  base: "relative group flex items-center justify-between gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5 w-full",
  variants: {},
});

const StyledReviewCardContent = styled(Collapsible.Content, {
  base: "p-4",
  variants: {},
});
