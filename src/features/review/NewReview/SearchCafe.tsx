import { styled } from "classname-variants/react";
import { useState, Suspense, ReactNode } from "react";

import { Text } from "~/ui";
import { AutocompletePlace, type TPlacePrediction } from "~/features/common";
import { trpc } from "~/utils/trpc";
import { SBox, SLabel } from "./common";
import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { RouterOutputs } from "~/utils/trpc";

export const SearchCafe = () => {
  const [place, setPlace] = useState<TPlacePrediction | null>(null);
  const placeDetailsQuery = trpc.places.getPlaceDetails.useQuery(
    { placeId: place?.place_id as string },
    { enabled: Boolean(place?.place_id) }
  );

  const isLoading = placeDetailsQuery.isLoading && Boolean(place);

  return (
    <SBox>
      <SLabel>Cafe</SLabel>
      <AutocompletePlace
        onSelectPrediction={(prediction) => setPlace(prediction)}
      />

      {isLoading && <CafeDetailsLoadingSkeleton />}
      {placeDetailsQuery.isSuccess && (
        <CafeDetails details={placeDetailsQuery.data} />
      )}
    </SBox>
  );
};

const CafeDetailsLoadingSkeleton = () => {
  return (
    <div className="mt-4 grid w-full grid-cols-2 gap-4">
      <SSkeleton className="col-span-2 h-16 w-full" />
      <SSkeleton className="h-40 w-full" />
      <SSkeleton className="h-40 w-full" />
      <SSkeleton className="h-40 w-full" />
      <SSkeleton className="h-40 w-full" />
    </div>
  );
};

const SSkeleton = styled("div", {
  base: "animate-pulse bg-sand-6",
  variants: {
    variant: {
      box: "rounded",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "box",
  },
});

type TCafeDetailsProps = {
  details: RouterOutputs["places"]["getPlaceDetails"];
};
const CafeDetails = ({ details }: TCafeDetailsProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 rounded p-4 ring-1 ring-sand-8">
      <SBox className="col-span-2">
        <Text className="text-3xl font-bold">{details?.name}</Text>
      </SBox>
      <SBox>
        <SBox>
          <SLabel>Address</SLabel>
          <Text>{details?.formattedAddress}</Text>
        </SBox>
        <SBox>
          <SLabel>Website</SLabel>
          {details.website ? (
            <Text as="a" href={details.website} target="_blank">
              {details.website}
            </Text>
          ) : (
            <Text>No websites available</Text>
          )}
        </SBox>
      </SBox>
      <SBox>
        <SLabel>Opening hours</SLabel>
        {details.openingHours ? (
          <TableOpeningHours periods={details.openingHours} />
        ) : (
          <Text>No opening hours available</Text>
        )}
      </SBox>
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
