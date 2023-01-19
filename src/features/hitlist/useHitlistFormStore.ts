import type { HitList, HitListPlace } from "@prisma/client";
import { createFormStore } from "~/utils/form";

type HitlistFormData = Omit<HitList, "userId" | "createdAt" | "updatedAt"> & {
  places: Pick<HitListPlace, "placeId">[];
};

const initFormData: HitlistFormData = {
  description: "",
  title: "New Hitlist",
  id: "",
  places: [],
};

export const useHitlistFormStore = createFormStore<HitlistFormData>({
  initFormData,
});
