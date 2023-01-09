import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteUser, RelatedUserModel, CompleteHitListPlace, RelatedHitListPlaceModel } from "./index"

export const HitListModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteHitList extends z.infer<typeof HitListModel> {
  user: CompleteUser
  places: CompleteHitListPlace[]
}

/**
 * RelatedHitListModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHitListModel: z.ZodSchema<CompleteHitList> = z.lazy(() => HitListModel.extend({
  user: RelatedUserModel,
  places: RelatedHitListPlaceModel.array(),
}))
