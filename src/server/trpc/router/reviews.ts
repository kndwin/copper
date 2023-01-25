import { z } from "zod";
import { router, publicProcedure } from "~/server/trpc/trpc";
import { ReviewModel } from "~/types/prismaZod";

const ReviewModelInput = ReviewModel.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const reviewRouter = router({
  getReviewFromId: publicProcedure
    .input(ReviewModel.pick({ id: true }))
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
      include: {
        place: {
          select: {
            formattedAddress: true,
            name: true,
          },
        },
      },
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        updatedAt: "desc",
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
  createOne: publicProcedure
    .input(ReviewModelInput.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const { placeId, ...rest } = input;
      const userId = ctx.session?.user?.id as string;
      const newReview = await ctx.prisma.review.create({
        data: {
          ...rest,
          place: {
            connect: {
              placeId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return newReview;
    }),
  updateOne: publicProcedure
    .input(ReviewModelInput)
    .mutation(async ({ ctx, input }) => {
      const { id, placeId, ...rest } = input;
      const updatedReview = await ctx.prisma.review.update({
        where: { id },
        data: {
          ...rest,
          place: {
            connect: {
              placeId,
            },
          },
        },
      });
      return updatedReview;
    }),
  deleteOne: publicProcedure
    .input(ReviewModel.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const deletedReview = await ctx.prisma.review.delete({
        where: { id: input.id },
      });
      return deletedReview;
    }),
});
