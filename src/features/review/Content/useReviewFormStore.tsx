import { type Review } from "@prisma/client";
import { createFormStore } from "~/utils/form";

type ReviewFormData = Omit<Review, "userId" | "createdAt" | "updatedAt">;

const initFormData: ReviewFormData = {
  id: "",
  placeId: "",
  status: "DRAFT",
  title: "New Review",
  coffee: "NONE",
  food: "NONE",
  powerpoints: "NONE",
  wifi: "NONE",
  review: "",
  socialFacebook: "",
  socialInstagram: "",
  recommend: true,
};

export const useReviewFormStore = createFormStore<ReviewFormData>({
  initFormData,
});
