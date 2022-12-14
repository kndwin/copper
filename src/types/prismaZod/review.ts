import * as z from "zod"
import * as imports from "../../../prisma/null"
import { Status, Quality, Powerpoints, Wifi } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompletePlaceDetails, RelatedPlaceDetailsModel } from "./index"

export const ReviewModel = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.nativeEnum(Status).nullish(),
  title: z.string(),
  socialFacebook: z.string().nullish(),
  socialInstagram: z.string().nullish(),
  review: z.string().nullish(),
  coffee: z.nativeEnum(Quality),
  food: z.nativeEnum(Quality),
  powerpoints: z.nativeEnum(Powerpoints),
  wifi: z.nativeEnum(Wifi),
  placeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  recommend: z.boolean(),
})

export interface CompleteReview extends z.infer<typeof ReviewModel> {
  user: CompleteUser
  place: CompletePlaceDetails
}

/**
 * RelatedReviewModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReviewModel: z.ZodSchema<CompleteReview> = z.lazy(() => ReviewModel.extend({
  user: RelatedUserModel,
  place: RelatedPlaceDetailsModel,
}))
