import create from "zustand";
import { type Review } from "@prisma/client";
import { immer } from "zustand/middleware/immer";

type State = {
  formData: Omit<Review, "id" | "userId">;
};

type FormStateOptions = keyof State["formData"];

type Actions = {
  reset: () => void;
  setFormState: <O extends FormStateOptions>(
    key: FormStateOptions,
    value: State["formData"][O]
  ) => void;
};

const initState: State = {
  formData: {
    coffee: "NONE",
    food: "NONE",
    powerpoints: "NONE",
    review: null,
    socialFacebook: null,
    socialInstagram: null,
    wifi: null,
  },
};

export const useReviewFormStore = create(
  immer<State & Actions>((set) => ({
    ...initState,
    reset: () => set(() => ({ ...initState })),
    setFormState: (key, value) => {
      set((state) => {
        state.formData[key] = value;
      });
    },
  }))
);
