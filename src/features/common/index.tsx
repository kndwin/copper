import { Text } from "~/ui";
import { styled } from "classname-variants/react";

export * from "./SelectHour";
export * from "./AutocompletePlace";
export * from "./TableOpeningHours";

export const Label = styled((props) => <Text as="label" {...props} />, {
  base: "font-bold",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Box = styled("div", {
  base: "",
  variants: {
    variant: {
      flex: "flex flex-col gap-2",
      grid: "grid grid-cols-2 gap-4",
    },
  },
  defaultVariants: {
    variant: "flex",
  },
});

export const Skeleton = styled("div", {
  base: "animate-pulse bg-sand-6",
  variants: {
    variant: {
      box: "rounded",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "box",
  },
});
