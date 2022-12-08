// import { z } from "zod";

import { router, publicProcedure } from "~/server/trpc/trpc";
import { ReviewModel } from "~/types/prismaZod";

const ReviewModelInput = ReviewModel.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const reviewRouter = router({
  createOne: publicProcedure
    .input(ReviewModelInput.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const newReview = await ctx.prisma.review.create({
        data: { ...input, userId: ctx.session?.user?.id as string },
      });
      return newReview;
    }),
  updateOne: publicProcedure
    .input(ReviewModelInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updatedReview = await ctx.prisma.review.update({
        where: { id },
        data,
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
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
});
