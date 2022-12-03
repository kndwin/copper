import { styled } from "classname-variants/react";

export const Button = styled("button", {
  base: "flex items-center rounded",
  variants: {
    variant: {
      default: "",
      filled: "",
      outline: "",
    },
    color: {
      sand: "bg-sand-4 hover:bg-sand-6 outline-sand-8",
    },
    size: {
      md: "px-2 py-1 gap-2",
      lg: "px-4 py-2 gap-4",
    },
  },
  compoundVariants: [
    {
      variants: {
        color: "sand",
        variant: "filled",
      },
      className:
        "bg-sand-12 text-sand-1 dark:bg-sand-1 dark:text-sand-12 hover:bg-sand-12",
    },
    {
      variants: {
        color: "sand",
        variant: "outline",
      },
      className: "bg-transparent ring-1 ring-sand-6 hover:bg-sand-3",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "sand",
    variant: "default",
  },
});
