import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { styled } from "classname-variants/react";

import { Text } from "~/ui";
import { AutocompletePlace } from "~/features/common";
import { type RouterOutputs, trpc } from "~/utils/trpc";

import { useReviewFormStore } from "./useReviewFormStore";
import { Box, Label, Skeleton } from "./common";

export const SearchCafe = () => {
  const placeId = useReviewFormStore((s) => s.formData.placeId);
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const placeDetailsQuery = trpc.places.getPlaceDetails.useQuery(
    { placeId },
    {
      enabled: placeId.length > 0,
    }
  );

  const isLoading = placeDetailsQuery.isLoading && Boolean(placeId);

  return (
    <Box>
      <Label>Cafe</Label>
      <AutocompletePlace
        onSelectPrediction={(prediction) =>
          setFormState("placeId", prediction.place_id)
        }
      />

      {isLoading && <CafeDetailsLoadingSkeleton />}
      {placeDetailsQuery.isSuccess && (
        <CafeDetails details={placeDetailsQuery.data} />
      )}
    </Box>
  );
};

export const CafeDetailsLoadingSkeleton = () => {
  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-4">
      <Skeleton className="col-span-2 h-16 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
};

type TCafeDetailsProps = {
  details: RouterOutputs["places"]["getPlaceDetails"];
};
const CafeDetails = ({ details }: TCafeDetailsProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 rounded p-4 ring-1 ring-sand-8">
      <Box className="col-span-2">
        <Text className="text-3xl font-bold">{details?.name}</Text>
      </Box>
      <Box>
        <Box>
          <Label>Address</Label>
          <Text>{details?.formattedAddress}</Text>
        </Box>
        <Box>
          <Label>Website</Label>
          {details.website ? (
            <Text as="a" href={details.website} target="_blank">
              {details.website}
            </Text>
          ) : (
            <Text>No websites available</Text>
          )}
        </Box>
      </Box>
      <Box>
        <Label>Opening hours</Label>
        {details.openingHours ? (
          <TableOpeningHours periods={details.openingHours} />
        ) : (
          <Text>No opening hours available</Text>
        )}
      </Box>
    </div>
  );
};

type TTableOpeningHoursProps = {
  periods: OpeningPeriod[];
};
const TableOpeningHours = ({ periods }: TTableOpeningHoursProps) => {
  return (
    <div className="w-full overflow-hidden rounded border border-sand-8">
      <table className="w-full  table-auto">
        <thead>
          <tr>
            <SCell as="th" className="p-2" align="left">
              Day
            </SCell>
            <SCell as="th" className="p-2" align="left">
              Open
            </SCell>
            <SCell as="th" className="p-2" align="left">
              Close
            </SCell>
          </tr>
        </thead>
        <tbody>
          {periods?.map((period, index) => (
            <tr key={index}>
              <SCell>{getDayName(period.open.day)}</SCell>
              <SCell>{getHourName(period.open?.time)}</SCell>
              <SCell>{getHourName(period.close?.time)}</SCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SCell = styled("td", {
  base: "p-2",
  variants: {},
});

const getDayName = (day: number) => {
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayName[day];
};

// input: "0500"
const getHourName = (input?: string) => {
  if (!Boolean(input)) {
    return "N/A";
  }

  let hour = Number(input?.slice(0, 2));
  const minutes = input?.slice(2, 4);
  let suffix: "AM" | "PM" = "AM";

  if (hour > 12) {
    hour = hour - 12;
    suffix = "PM";
  }

  return `${hour}:${minutes} ${suffix}`;
};
