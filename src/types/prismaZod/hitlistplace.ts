import * as z from "zod"
import * as imports from "../../../prisma/null"
import { Visited } from "@prisma/client"
import { CompletePlaceDetails, RelatedPlaceDetailsModel, CompleteHitList, RelatedHitListModel } from "./index"

export const HitListPlaceModel = z.object({
  id: z.string(),
  placeId: z.string(),
  hitListId: z.string().nullish(),
  visited: z.nativeEnum(Visited),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteHitListPlace extends z.infer<typeof HitListPlaceModel> {
  place: CompletePlaceDetails
  HitList?: CompleteHitList | null
}

/**
 * RelatedHitListPlaceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHitListPlaceModel: z.ZodSchema<CompleteHitListPlace> = z.lazy(() => HitListPlaceModel.extend({
  place: RelatedPlaceDetailsModel,
  HitList: RelatedHitListModel.nullish(),
}))
