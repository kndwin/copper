import { Text } from "~/ui";
import { styled } from "classname-variants/react";

export const SLabel = styled((props) => <Text as="label" {...props} />, {
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

export const SBox = styled("div", {
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
