// import { styled } from "classname-variants/react";
import * as P from "@radix-ui/react-popover";
import { styled, type VariantPropsOf } from "classname-variants/react";
import cx from "classnames";

const Trigger = styled(P.Trigger, {
  base: "flex items-center gap-2 rounded",
  variants: {
    asChild: {
      true: "bg-transparent hover:bg-transparent p-0",
    },
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
const StyledContent = styled(P.Content, {
  base: cx(
    "radix-side-top:animate-in radix-side-top:fade-in-50",
    "radix-side-bottom:animate-in radix-side-bottom:fade-in-50"
  ),
  variants: {
    color: {
      sand: "bg-sand-2 border border-sand-6 outline-sand-8 outline-1 ring-1 ring-sand-8",
    },
    size: {
      xs: "w-[5em] rounded-lg bg-sand-2 p-1 md:w-[10em]",
      sm: "w-[10em] rounded-lg bg-sand-2 p-1 md:w-[15em]",
      md: "w-[15em] rounded-lg bg-sand-2 px-1.5 py-1 md:w-[20em]",
      lg: "w-[20em] rounded-lg bg-sand-2 px-1.5 py-1 md:w-[25em]",
      xl: "w-[25em] rounded-lg bg-sand-2 px-2 py-1 md:w-[30em]",
    },
  },
  defaultVariants: {
    color: "sand",
    size: "md",
  },
});
const Content = ({
  children,
  ...props
}: P.PopoverContentProps & VariantPropsOf<typeof StyledContent>) => {
  return (
    <P.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </P.Portal>
  );
};

export const Popover = Object.assign(P.Root, {
  Trigger,
  Content,
  Anchor: P.Anchor,
});
