import { useState } from "react";
import { styled } from "classname-variants/react";

import { type RouterOutputs, trpc } from "~/utils/trpc";
import { Text, Dialog } from "~/ui";
import { TableOpeningHours } from "~/features/common";

export const GridCafes = () => {
  const placesQuery = trpc.places.getPlacesWithReviews.useQuery();

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {placesQuery.data?.map((place) => (
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
        <Text>{place.formattedAddress}</Text>
        <Text>Reviews: {place._count.reviews}</Text>
      </StyledCafeCard>
      <Dialog.ContentControlled
        size="lg"
        open={openDialog}
        onOpenChange={(open) => setOpenDialog(open)}
      >
        <DialogContentReviews place={place} />
      </Dialog.ContentControlled>
    </>
  );
};

const StyledCafeCard = styled("div", {
  base: "flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5",
  variants: {},
});

type DialogContentReviewsProps = {
  place: CafeCardProps["place"];
};

const DialogContentReviews = ({ place }: DialogContentReviewsProps) => {
  const { data, isLoading } = trpc.review.getReviewFromPlace.useQuery({
    placeId: place.placeId,
  });

  return (
    <>
      <Text className="mb-2 text-lg font-bold">{place.name}</Text>
      <div className="flex flex-col">
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
        <TableOpeningHours periods={place.openingHours} />
      </div>
      <div className="flex flex-col gap-4 pt-2">
        {isLoading && <div>Loading</div>}
        {data?.map((review) => (
          <StyledReviewCard key={review.id}>
            <Text>{review.title}</Text>
          </StyledReviewCard>
        ))}
      </div>
    </>
  );
};

const StyledReviewCard = styled("div", {
  base: "flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5",
  variants: {},
});
