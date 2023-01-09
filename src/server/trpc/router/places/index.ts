import type { PlaceDetails, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  Client,
  type AddressGeometry,
  type OpeningPeriod,
  type PlaceDetailsResponse,
} from "@googlemaps/google-maps-services-js";

import { router, publicProcedure } from "~/server/trpc/trpc";
// import * as mock from "./mock";

const client = new Client({});

export type TPlaceDetails = Omit<PlaceDetails, "openingHours" | "geometry"> & {
  openingHours: OpeningPeriod[];
  geometry: AddressGeometry;
};

type TPlaceDetailsInput = Omit<PlaceDetails, "openingHours" | "geometry"> & {
  openingHours: Prisma.JsonArray;
  geometry: Prisma.JsonObject;
};

export const placesRouter = router({
  getAutocomplete: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await client.placeAutocomplete({
        params: {
          key: `${process.env.GOOGLE_PLACE_API_KEY}`,
          input: input.text,
          location: {
            // Sydney
            latitude: -33.865143,
            longitude: 151.2099,
          },
          radius: 25_000, // in meters
          strictbounds: true,
        },
      });
      return result.data;
    }),
  getPlaceDetails: publicProcedure
    .input(
      z.object({
        placeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      let placeDetailsResponse: TPlaceDetails | null = null;

      const { prisma } = ctx;

      const placeDetailsFromDB = await prisma.placeDetails.findFirst({
        where: {
          placeId: input.placeId,
        },
      });

      if (placeDetailsFromDB) {
        placeDetailsResponse = placeDetailsFromDB as unknown as TPlaceDetails;
      } else {
        const result = await client.placeDetails({
          params: {
            key: `${process.env.GOOGLE_PLACE_API_KEY}`,
            place_id: input.placeId,
          },
        });

        const formattedPlaceDetails = formatPlaceDetailsResponseToPrismaDBInput(
          result.data.result
        );

        const newPlaceDetails = await prisma.placeDetails.create({
          data: formattedPlaceDetails,
        });

        placeDetailsResponse = newPlaceDetails as unknown as TPlaceDetails;
      }

      return placeDetailsResponse;
    }),
  getManyPlacesWithReviews: publicProcedure.query(async ({ ctx }) => {
    const places = await ctx.prisma.placeDetails.findMany({
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      where: {
        reviews: {
          some: {
            status: {
              equals: "PUBLISHED",
            },
          },
        },
      },
    });
    return places;
  }),
  getOnePlaceWithReviews: publicProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const places = await ctx.prisma.placeDetails.findFirst({
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  email: true,
                  image: true,
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: {
          placeId: input.placeId,
          reviews: {
            some: {
              status: {
                equals: "PUBLISHED",
              },
            },
          },
        },
      });
      return places;
    }),
});

const formatPlaceDetailsResponseToPrismaDBInput = (
  result: PlaceDetailsResponse["data"]["result"]
) => {
  return {
    formattedAddress: result.formatted_address,
    formattedPhoneNumber: result.formatted_phone_number,
    name: result.name,
    placeId: result.place_id,
    website: result.website,
    openingHours: result.opening_hours
      ?.periods as unknown as Prisma.InputJsonArray,
    geometry: result.geometry as unknown as Prisma.InputJsonObject,
  } as TPlaceDetailsInput;
};
