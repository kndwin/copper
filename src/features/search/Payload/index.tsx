import { styled } from "classname-variants/react";
import { useState } from "react";
import { HiX, HiOutlineDocumentText, HiExternalLink } from "react-icons/hi";
import Link from "next/link";

import { type RouterOutputs, trpc } from "~/utils/trpc";
import { Text, Dialog, Skeleton } from "~/ui";

import { PlaceDetails } from "./PlaceDetails";
import { CollapsibleReview } from "./CollapsibleReview";

export const GridCafes = () => {
  const { data, isLoading } = trpc.places.getManyPlacesWithReviews.useQuery();

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
  place: RouterOutputs["places"]["getManyPlacesWithReviews"][number];
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
  place: RouterOutputs["places"]["getManyPlacesWithReviews"][number];
};

const DialogContentReviews = ({ place }: DialogContentReviewsProps) => {
  const { data, isLoading } = trpc.review.getReviewFromPlace.useQuery({
    placeId: place.placeId,
  });

  return (
    <div className="flex h-full w-full flex-1">
      <PlaceDetails
        place={place}
        reviews={data as RouterOutputs["review"]["getReviewFromPlace"]}
      />
      <div className="flex h-full flex-1 flex-col bg-sand-4">
        <div className="ml-auto flex w-fit gap-2 p-4">
          <Link href={`/place/${place.placeId}`} target="_blank">
            <HiExternalLink className="h-6 w-6" />
          </Link>
          <Dialog.Close>
            <HiX className="h-6 w-6" />
          </Dialog.Close>
        </div>

        <div className="flex w-full flex-col gap-4 p-4 pt-0">
          {isLoading &&
            [...Array(8).keys()].map((index) => (
              <Skeleton key={index} className="h-40 w-full" />
            ))}

          {data?.map((review) => (
            <CollapsibleReview key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
