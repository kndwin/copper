import { z } from "zod";
import { router, publicProcedure } from "~/server/trpc/trpc";
import { HitListModel, HitListPlaceModel } from "~/types/prismaZod";

const HitListModelInput = HitListModel.merge(
  z.object({
    places: z.array(z.object({ placeId: z.string() })),
  })
).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const hitlistRouter = router({
  createOne: publicProcedure
    .input(HitListModelInput.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id as string;
      const { places, ...hitlistData } = input;
      const newHitlist = await ctx.prisma.hitList.create({
        data: {
          ...hitlistData,
          places: {
            createMany: {
              data: [
                ...places.map(({ placeId }) => ({
                  placeId,
                  place: {
                    connect: {
                      placeId,
                    },
                  },
                })),
              ],
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      /*
			const newHitlistPlaces = ctx.prisma.hitListPlace.createMany({
				data: [...places.map(({ placeId }) => ({
					placeId, 
					place: {
						connect: {
							placeId
						}
					},
					hitlistId: newHitlist.id
				}))]
			})
			*/
      return newHitlist;
    }),
  deleteOne: publicProcedure
    .input(HitListModel.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const deletedHitlist = await ctx.prisma.hitList.delete({
        where: { id: input.id },
      });
      return deletedHitlist;
    }),
});
