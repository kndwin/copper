import type { HitList, HitListPlace } from "@prisma/client";
import { createFormStore } from "~/utils/form";

type HitlistFormData = HitList & {
  places: Partial<HitListPlace>[];
};

const initFormData: HitlistFormData = {
  description: "",
  userId: "",
  title: "New Hitlist",
  id: "",
  places: [],
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

export const useHitlistFormStore = createFormStore<HitlistFormData>({
  initFormData,
});
