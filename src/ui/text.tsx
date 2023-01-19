import { styled } from "classname-variants/react";

export const Text = styled("p", {
  base: "whitespace-pre-line",
  variants: {
    color: {
      sand: "text-sand-12 selection:bg-sand-6",
    },
  },
  defaultVariants: {
    color: "sand",
  },
});
