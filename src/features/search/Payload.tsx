import { useState } from "react";
import { styled } from "classname-variants/react";
import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { HiChevronDown, HiX, HiOutlineDocumentText } from "react-icons/hi";

import { type RouterOutputs, trpc } from "~/utils/trpc";
import { Text, Dialog, Collapsible, Avatar, Skeleton } from "~/ui";
import { getInitials, getFirstName } from "~/features/layout/utils";
import { TableOpeningHours } from "~/features/common";
import { Review } from "@prisma/client";

export const GridCafes = () => {
  const { data, isLoading } = trpc.places.getPlacesWithReviews.useQuery();

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading &&
        [...Array(16).keys()].map((index) => (
          <Skeleton key={index} className="h-40 w-full" />
        ))}
      {data?.map((place) => (
        <CafeCard key={place.placeId} place={place} />
      ))}
    </div>
  );
};

type CafeCardProps = {
  place: RouterOutputs["places"]["getPlacesWithReviews"][number];
};

const CafeCard = ({ place }: CafeCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <StyledCafeCard onClick={() => setOpenDialog(true)}>
        <Text className="text-lg font-bold text-sand-12">{place.name}</Text>
        <Text className="text-sm text-sand-10">{place.formattedAddress}</Text>
        <div className="ml-auto flex w-fit items-center gap-1 rounded bg-sand-3 px-2">
          <HiOutlineDocumentText />
          <Text>{place._count.reviews}</Text>
        </div>
      </StyledCafeCard>
      <Dialog.ContentControlled
        size="xl"
        open={openDialog}
        onOpenChange={(open) => setOpenDialog(open)}
      >
        <DialogContentReviews place={place} />
      </Dialog.ContentControlled>
    </>
  );
};

const StyledCafeCard = styled("div", {
  base: "flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-1 p-4 hover:bg-sand-5",
  variants: {},
});

type DialogContentReviewsProps = {
  place: RouterOutputs["places"]["getPlacesWithReviews"][number];
};

const DialogContentReviews = ({ place }: DialogContentReviewsProps) => {
  const { data, isLoading } = trpc.review.getReviewFromPlace.useQuery({
    placeId: place.placeId,
  });

  return (
    <div className="relative flex h-full w-full">
      <Dialog.Close className="absolute top-4 right-4">
        <HiX className="h-6 w-6" />
      </Dialog.Close>
      <PlaceDetails
        place={place}
        reviews={data as RouterOutputs["review"]["getReviewFromPlace"]}
      />
      <div className="flex w-full flex-col gap-4 bg-sand-4 p-6 pt-16">
        {isLoading &&
          [...Array(8).keys()].map((index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}

        {data?.map((review) => (
          <CollapsibleReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

type PlaceDetailsProps = {
  place: RouterOutputs["places"]["getPlacesWithReviews"][number];
  reviews: RouterOutputs["review"]["getReviewFromPlace"];
};

const PlaceDetails = ({ place, reviews }: PlaceDetailsProps) => {
  const stats = getReviewStatistics(reviews);
  return (
    <div className="flex h-full max-w-sm flex-col gap-4 p-6">
      <Text className="mb-4 flex text-4xl font-bold">{place.name}</Text>
      <div className="flex gap-4">
        <Text className="font-bold">{`Website: `}</Text>
        <Text as="a" href={place.website as string} target="_blank">
          {place.website}
        </Text>
      </div>
      <div className="flex gap-4">
        <Text className="font-bold">{`Address: `}</Text>
        {place.formattedAddress}
      </div>
      <div className="flex gap-4">
        <Text className="font-bold">{`Coffee: `}</Text>
        <Text>
          {`N/A `}
          {stats.coffee.NONE}
        </Text>
        <Text>
          {`Poor `}
          {stats.coffee.POOR}
        </Text>
        <Text>
          {`Okay `}
          {stats.coffee.OKAY}
        </Text>
        <Text>
          {`Good `}
          {stats.coffee.GOOD}
        </Text>
      </div>

      <TableOpeningHours
        periods={place.openingHours as unknown as OpeningPeriod[]}
      />
    </div>
  );
};

type PickReviewStats<T, K extends keyof T> = {
  [P in K]: T[P] extends string ? { [Q in T[P]]: number } : never;
};

type ReviewStatFields = keyof Pick<
  Review,
  "coffee" | "food" | "powerpoints" | "wifi"
>;
type ReviewStats = PickReviewStats<Review, ReviewStatFields>;

const getReviewStatistics = (reviews: Review[]) => {
  // Hashmap
  const stats: ReviewStats = {
    wifi: {
      NONE: 0,
      STRONG: 0,
      WEAK: 0,
    },
    powerpoints: {
      LIMITED: 0,
      MANY: 0,
      NONE: 0,
    },
    food: {
      GOOD: 0,
      NONE: 0,
      OKAY: 0,
      POOR: 0,
    },
    coffee: {
      GOOD: 0,
      NONE: 0,
      OKAY: 0,
      POOR: 0,
    },
  };

  reviews.forEach((review) => {
    stats.coffee[review.coffee]++;
    stats.food[review.food]++;
    stats.powerpoints[review.powerpoints]++;
    stats.wifi[review.wifi]++;
  });

  return stats;
};

type CollapsibleReviewProps = {
  review: RouterOutputs["review"]["getReviewFromPlace"][number];
};

const CollapsibleReview = ({ review }: CollapsibleReviewProps) => {
  return (
    <Collapsible>
      <StyledReviewCardTrigger>
        <Text className="font-bold">{review.title}</Text>
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
