import { trpc } from "~/utils/trpc";
import { Text } from "~/ui";

export const GridCafes = () => {
  const placesQuery = trpc.places.getPlacesWithReviews.useQuery();

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {placesQuery.data?.map((place) => (
        <div
          key={place.placeId}
          className="flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5"
        >
          <Text className="text-lg font-bold text-sand-12">{place.name}</Text>
          <Text>{place.formattedAddress}</Text>
        </div>
      ))}
    </div>
  );
};
