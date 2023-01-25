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
  getHitlistFromUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.hitList.findMany({
      include: {
        _count: {
          select: {
            places: true,
          },
        },
      },
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
  getHitlistFromId: publicProcedure
    .input(HitListModel.pick({ id: true }))
    .query(async ({ ctx, input }) => {
      const hitlist = await ctx.prisma.hitList.findFirst({
        where: { id: input.id },
        include: {
          places: {
            include: {
              place: true,
            },
          },
        },
      });
      return hitlist;
    }),
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
      return newHitlist;
    }),
  updateOne: publicProcedure
    .input(HitListModel)
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const updatedReview = await ctx.prisma.hitList.update({
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
});
