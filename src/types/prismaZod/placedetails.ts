import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteReview, RelatedReviewModel, CompleteHitListPlace, RelatedHitListPlaceModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const PlaceDetailsModel = z.object({
  placeId: z.string(),
  name: z.string().nullish(),
  formattedAddress: z.string().nullish(),
  formattedPhoneNumber: z.string().nullish(),
  website: z.string().nullish(),
  openingHours: jsonSchema,
  geometry: jsonSchema,
})

export interface CompletePlaceDetails extends z.infer<typeof PlaceDetailsModel> {
  reviews: CompleteReview[]
  HitListPlace: CompleteHitListPlace[]
}

/**
 * RelatedPlaceDetailsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlaceDetailsModel: z.ZodSchema<CompletePlaceDetails> = z.lazy(() => PlaceDetailsModel.extend({
  reviews: RelatedReviewModel.array(),
  HitListPlace: RelatedHitListPlaceModel.array(),
}))
