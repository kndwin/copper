import { type Review } from "@prisma/client";
import { createFormStore } from "~/features/common/forms";

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
  review: null,
  socialFacebook: null,
  socialInstagram: null,
  recommend: true,
};

export const useReviewFormStore = createFormStore<ReviewFormData>({
  initFormData,
});
