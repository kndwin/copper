import { type ReactNode } from "react";
import { type Review } from "@prisma/client";
import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import {
  HiX,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiHeart,
  HiOutlineMenuAlt4,
  HiOutlineMenu,
} from "react-icons/hi";
import { TbWifi1, TbWifi2 } from "react-icons/tb";

import { type RouterOutputs } from "~/utils/trpc";
import { Text, Tooltip } from "~/ui";
import { TableOpeningHours } from "~/features/common";

type PlaceDetailsProps = {
  place: RouterOutputs["places"]["getManyPlacesWithReviews"][number];
  reviews: RouterOutputs["review"]["getReviewFromPlace"];
};

export const PlaceDetails = ({ place, reviews }: PlaceDetailsProps) => {
  return (
    <div className="flex h-full max-w-md flex-col gap-4 p-6">
      <Text className="mb-4 flex text-4xl font-bold">{place.name}</Text>

      <div className="flex gap-4">
        <Text className="w-20 font-bold">{`Website: `}</Text>
        <Text
          as="a"
          href={place.website as string}
          target="_blank"
          className="text-sm text-blue-10 hover:text-blue-8"
        >
          {place.website}
        </Text>
      </div>
      <div className="flex gap-4">
        <Text className="w-20 font-bold">{`Address: `}</Text>
        <Text className="text-sm">{place.formattedAddress}</Text>
      </div>

      <DisplayStatsContainer reviews={reviews} />

      <Text className="font-bold">Opening hours</Text>
      <TableOpeningHours
        periods={place.openingHours as unknown as OpeningPeriod[]}
      />
    </div>
  );
};

type DisplayStatsContainerProps = {
  reviews: RouterOutputs["review"]["getReviewFromPlace"];
};

export const DisplayStatsContainer = ({
  reviews,
}: DisplayStatsContainerProps) => {
  const stats = getReviewStatistics(reviews);
  const displayStats = getDisplayStatistics(stats);

  return (
    <>
      {Object.entries(displayStats).map(([key, stats]) => (
        <div className="flex items-center gap-4" key={key}>
          <Text className="mr-auto font-bold capitalize">{`${key}: `}</Text>
          {stats.map((stat, index) => (
            <DisplayStat key={index} {...stat} />
          ))}
        </div>
      ))}
    </>
  );
};

type DisplayStatProps = {
  icon: ReactNode;
  value: number;
  tooltip: string;
};

const DisplayStat = ({ value, icon, tooltip }: DisplayStatProps) => {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <div className="flex h-fit items-center gap-2 rounded bg-sand-4 px-2 py-1">
          {icon}
          <Text>{value}</Text>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Text>{tooltip}</Text>
      </Tooltip.Content>
    </Tooltip>
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

const getDisplayStatistics = (stats: ReviewStats) => {
  return {
    coffee: [
      {
        icon: <HiX />,
        value: stats.coffee.NONE,
        tooltip: "No data given",
      },
      {
        icon: <HiOutlineThumbDown />,
        value: stats.coffee.POOR,
        tooltip: "Poor quality",
      },
      {
        icon: <HiOutlineThumbUp />,
        value: stats.coffee.OKAY,
        tooltip: "Okay quality",
      },
      {
        icon: <HiHeart />,
        value: stats.coffee.GOOD,
        tooltip: "Great quality",
      },
    ],
    food: [
      {
        icon: <HiX />,
        value: stats.food.NONE,
        tooltip: "No data given",
      },
      {
        icon: <HiOutlineThumbDown />,
        value: stats.food.POOR,
        tooltip: "Poor quality",
      },
      {
        icon: <HiOutlineThumbUp />,
        value: stats.food.OKAY,
        tooltip: "Okay quality",
      },
      {
        icon: <HiHeart />,
        value: stats.food.GOOD,
        tooltip: "Great quality",
      },
    ],
    powerpoints: [
      {
        icon: <HiX />,
        value: stats.powerpoints.NONE,
        tooltip: "No powerpoints",
      },
      {
        icon: <HiOutlineMenuAlt4 />,
        value: stats.powerpoints.LIMITED,
        tooltip: "Limited powerpoints",
      },
      {
        icon: <HiOutlineMenu />,
        value: stats.powerpoints.MANY,
        tooltip: "Many powerpoints ",
      },
    ],
    wifi: [
      {
        icon: <HiX />,
        value: stats.wifi.NONE,
        tooltip: "No WiFi",
      },
      {
        icon: <TbWifi1 />,
        value: stats.wifi.WEAK,
        tooltip: "Limited powerpoints",
      },
      {
        icon: <TbWifi2 />,
        value: stats.wifi.STRONG,
        tooltip: "Many powerpoints",
      },
    ],
  } as Record<
    keyof ReviewStats,
    { icon: ReactNode; value: number; tooltip: string }[]
  >;
};

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

  reviews?.forEach((review) => {
    stats.coffee[review.coffee]++;
    stats.food[review.food]++;
    stats.powerpoints[review.powerpoints]++;
    stats.wifi[review.wifi]++;
  });

  return stats;
};
