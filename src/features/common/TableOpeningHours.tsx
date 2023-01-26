import { type ReactNode } from "react";
import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { styled } from "classname-variants/react";

type TTableOpeningHoursProps = {
  periods: OpeningPeriod[];
};

export const TableOpeningHours = ({ periods }: TTableOpeningHoursProps) => {
  return (
    <div className="w-full overflow-hidden ">
      <table className="w-full text-left text-sm text-sand-12">
        <thead className="rounded-lg bg-sand-4 text-xs uppercase text-sand-12">
          <tr>
            <HeaderCell>Day</HeaderCell>
            <HeaderCell>Open</HeaderCell>
            <HeaderCell>Close</HeaderCell>
          </tr>
        </thead>
        <tbody className="bg-tranparent">
          {periods?.map((period, index) => (
            <tr
              key={index}
              className={`${
                index !== periods.length - 1 && "border-b border-sand-5"
              }`}
            >
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

const HeaderCell = ({ children }: { children: ReactNode }) => {
  return (
    <Cell scope="col" as="th" align="left" className="text-sand-12">
      {children}
    </Cell>
  );
};

const Cell = styled("td", {
  base: "py-3 px-4",
  variants: {
    size: {
      md: "text-sm",
      lg: "text-base",
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
