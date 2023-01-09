import { type NextPage } from "next";
import { useRouter } from "next/router";

import { TableOpeningHours } from "~/features/common";
import { Page, IconToggleDarkMode } from "~/features/layout";
import { Skeleton, Text } from "~/ui";
import { trpc } from "~/utils/trpc";
import { CollapsibleReview } from "~/features/search/Payload/CollapsibleReview";
import { DisplayStatsContainer } from "~/features/search/Payload/PlaceDetails";

const PlaceDetailWithReviewPage: NextPage = () => {
  const { query } = useRouter();
  const { data, status } = trpc.places.getOnePlaceWithReviews.useQuery(
    { placeId: query?.id as string },
    {
      enabled: Boolean(query?.id),
    }
  );

  return (
    <Page>
      <Page.Header>
        <Text className="text-2xl font-bold">{data?.name}</Text>
        <IconToggleDarkMode />
      </Page.Header>
      <Page.Content className="mt-8 px-4">
        {status === "loading" &&
          [...Array(8).keys()].map((index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        {status === "success" && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <DisplayStatsContainer reviews={data?.reviews} />
              </div>
              <TableOpeningHours periods={data?.openingHours} />
            </div>

            {data?.reviews.map((review) => (
              <CollapsibleReview key={review.id} review={review} />
            ))}
          </div>
        )}
      </Page.Content>
    </Page>
  );
};

export default PlaceDetailWithReviewPage;
