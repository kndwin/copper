import { styled } from "classname-variants/react";

export const Button = styled("button", {
  base: "flex items-center gap-2 rounded",
  variants: {
    color: {
      sand: "bg-sand-4 hover:bg-sand-6 outline-sand-8",
    },
    size: {
      md: "px-2 py-1",
    },
  },
  defaultVariants: {
    size: "md",
    color: "sand",
  },
});
