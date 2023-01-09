 import { z } from "zod";
import { router, publicProcedure } from "~/server/trpc/trpc";
import { HitListModel, HitListPlaceModel } from "~/types/prismaZod";

const HitListModelInput = HitListModel.merge(z.object({
	places: z.array(z.object({ placeId: z.string()}))
})).omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});



export const hitlistRouter = router({
  createOne: publicProcedure
    .input(HitListModelInput.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id as string;
			const { places, ...hitlistData } = input
      const newHitlist = await ctx.prisma.hitList.create({
        data: {
          ...hitlistData,
					places: {
						createMany: { 
							data: [...places.map(({ placeId }) => ({
								placeId, 
								place: {
									connect: {
										placeId
									}
								},
							}))] 
						}
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
  updateOne: publicProcedure
    .input(HitListModelInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const updatedReview = await ctx.prisma.review.update({
        where: { id },
        data: {
          ...rest,
        },
      });
      return updatedReview;
    }),
  deleteOne: publicProcedure
    .input(HitListModel.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const deletedHitlist = await ctx.prisma.hitList.delete({
        where: { id: input.id },
      });
      return deletedHitlist;
    }),
  getReviewFromId: publicProcedure
    .input(HitListModel.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findFirst({
        where: { id: input.id },
        include: {
          place: true,
        },
      });
      return review;
    }),
  getReviewFromUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.review.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
  getReviewFromPlace: publicProcedure
    .input(z.object({ placeId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.review.findMany({
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
        where: {
          placeId: input.placeId,
        },
      });
    }),
}
