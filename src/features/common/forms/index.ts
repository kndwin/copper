import create from "zustand";
import { immer } from "zustand/middleware/immer";

type State<FD extends object> = {
  formData: FD;
  errors: Record<keyof FD, ErrorMessage> | Record<string, never>;
  mode: Mode;
};

type Mode = "new" | "update";

type ErrorMessage =
  | {
      message: string;
    }
  | undefined;

type Actions<FD> = {
  reset: () => void;
  setMode: (mode: Mode) => void;
  setFormState: <O extends keyof FD>(key: keyof FD, value: FD[O]) => void;
  setAllFormState: (formData: FD) => void;
  setFormError: <O extends keyof FD>(key: keyof FD, value: FD[O]) => void;
  resetFormError: (key: keyof FD) => void;
  resetAllFormError: () => void;
};

type UseFormStoreProps<FD> = {
  initFormData: FD;
};

export const createFormStore = <FD extends object>({
  initFormData,
}: UseFormStoreProps<FD>) => {
  const inititalData: State<FD> = {
    mode: "new",
    errors: {},
    formData: initFormData,
  };

  return create<State<FD> & Actions<FD>>()(
    immer((set) => ({
      ...inititalData,
      reset: () => set(() => ({ ...inititalData })),
      setAllFormState: (formData) => set(() => ({ formData })),
      setFormState: (key, value) => {
        set((state) => {
          Reflect.set(state.formData, key, value);
        });
      },
      setFormError: (key, value) => {
        set((state) => {
          Reflect.set(state.errors, key, value);
        });
      },
      setMode: (mode) =>
        set((state) => {
          state.mode = mode;
        }),
      resetFormError: (key) => {
        set((state) => {
          Reflect.set(state.errors, key, undefined);
        });
      },
      resetAllFormError: () => set(() => ({ errors: {} })),
    }))
  );
};
