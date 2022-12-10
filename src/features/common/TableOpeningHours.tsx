import { type OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { styled } from "classname-variants/react";

type TTableOpeningHoursProps = {
  periods: OpeningPeriod[];
};

export const TableOpeningHours = ({ periods }: TTableOpeningHoursProps) => {
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
