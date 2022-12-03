import { styled } from "classname-variants/react";

export const Tag = styled("p", {
  base: "",
  variants: {
    color: {
      sand: "text-sand-12 bg-sand-5 selection:bg-sand-6",
    },
    size: {
      md: "rounded px-2 py-1 text-xs font-bold",
    },
  },
  defaultVariants: {
    color: "sand",
    size: "md",
  },
});
