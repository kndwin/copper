import create from "zustand";
import { type Review } from "@prisma/client";
import { immer } from "zustand/middleware/immer";

type State = {
  formData: Omit<Review, "userId" | "createdAt" | "updatedAt">;
  errors: Record<keyof State["formData"], ErrorMessage> | Record<string, never>;
  mode: Mode;
};

type Mode = "new" | "update";
type ErrorMessage =
  | {
      message: string;
    }
  | undefined;

type Actions = {
  reset: () => void;
  setMode: (mode: Mode) => void;
  setFormState: <O extends keyof State["formData"]>(
    key: keyof State["formData"],
    value: State["formData"][O]
  ) => void;
  setAllFormState: (formData: State["formData"]) => void;
  setFormError: <O extends keyof State["formData"]>(
    key: keyof State["formData"],
    value: State["formData"][O]
  ) => void;
  resetFormError: (key: keyof State["formData"]) => void;
  resetAllFormError: () => void;
};

const initState: State = {
  mode: "new",
  errors: {},
  formData: {
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
  },
};

export const useReviewFormStore = create(
  immer<State & Actions>((set) => ({
    ...initState,
    reset: () => set(() => ({ ...initState })),
    setAllFormState: (formData) => set(() => ({ formData })),
    setFormState: (key, value) => {
      set((state) => {
        state.formData[key] = value;
      });
    },
    setFormError: (key, value) => {
      set((state) => {
        state.errors[key] = value;
      });
    },
    setMode: (mode) =>
      set((state) => {
        state.mode = mode;
      }),
    resetFormError: (key) => {
      set((state) => {
        state.errors[key] = undefined;
      });
    },
    resetAllFormError: () => set(() => ({ errors: {} })),
  }))
);
