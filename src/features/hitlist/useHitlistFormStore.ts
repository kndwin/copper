import { type HitList } from "@prisma/client";
import { createFormStore } from "~/features/common/forms";

type HitlistFormData = Omit<HitList, "userId" | "createdAt" | "updatedAt">;

const initFormData: HitlistFormData = {
  description: "",
  id: "",
  title: "New Hitlist",
};

export const useHitlistFormStore = createFormStore<HitlistFormData>({
  initFormData,
});
