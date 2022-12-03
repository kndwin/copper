import { type NextPage } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { GiCoffeePot, GiSun, GiMoon } from "react-icons/gi";

import { Button, Popover, Input, Menu, Select } from "~/ui";
import { trpc } from "~/utils/trpc";

export const GridCafes = () => {
  const cafeQuery = trpc.cafes.getAll.useQuery();
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cafeQuery.data?.map((cafe) => (
        <div
          key={cafe.id}
          className="flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5"
        >
          <p className="text-lg text-sand-12">{cafe.name}</p>
          <img
            src={cafe.image}
            alt="Image of cafe"
            className="h-[10em] object-cover"
          />
        </div>
      ))}
    </div>
  );
};
