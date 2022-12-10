import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { styled } from "classname-variants/react";

type TTableOpeningHoursProps = {
  periods: OpeningPeriod[];
};

export const TableOpeningHours = ({ periods }: TTableOpeningHoursProps) => {
  return (
    <div className="w-full overflow-hidden rounded border border-sand-8">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <Cell as="th" align="left" size="lg">
              Day
            </Cell>
            <Cell as="th" align="left" size="lg">
              Open
            </Cell>
            <Cell as="th" align="left" size="lg">
              Close
            </Cell>
          </tr>
        </thead>
        <tbody>
          {periods?.map((period, index) => (
            <tr key={index}>
              <Cell>{getDayName(period.open.day)}</Cell>
              <Cell>{getHourName(period.open?.time)}</Cell>
              <Cell>{getHourName(period.close?.time)}</Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Cell = styled("td", {
  base: "py-2 px-3",
  variants: {
    size: {
      md: "",
      lg: "p-2 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
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
// output: "5:00 AM"
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
