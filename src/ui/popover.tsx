// import { styled } from "classname-variants/react";
import * as P from "@radix-ui/react-popover";
import { styled, VariantPropsOf } from "classname-variants/react";
import cx from "classnames";

const Root = ({ children, ...props }: P.PopoverProps) => {
  return (
    <div className="relative">
      <P.Root {...props}>{children}</P.Root>
    </div>
  );
};
const Trigger = P.Trigger;
const StyledContent = styled(P.Content, {
  base: cx(
    "radix-side-top:animate-in radix-side-top:fade-in-50",
    "radix-side-bottom:animate-in radix-side-bottom:fade-in-50"
  ),
  variants: {
    color: {
      sand: "bg-sand-2 border border-sand-6",
    },
    size: {
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

export const Popover = Object.assign(Root, {
  Trigger,
  Content,
});
