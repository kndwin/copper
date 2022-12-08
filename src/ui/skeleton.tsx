import { styled } from "classname-variants/react";

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
