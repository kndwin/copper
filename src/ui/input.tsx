import { styled } from "classname-variants/react";

export const Input = styled("input", {
  base: "rounded border",
  variants: {
    color: {
      sand: "border-sand-8 bg-sand-2 placeholder:text-sand-9 focus:outline-sand-9",
    },
    size: {
      md: "px-2 py-1 w-full",
    },
  },
  defaultVariants: {
    size: "md",
    color: "sand",
  },
});
