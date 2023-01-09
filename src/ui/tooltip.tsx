import * as P from "@radix-ui/react-tooltip";
import { styled } from "classname-variants/react";
import cx from "classnames";

const StyledTooltipContent = styled(P.Content, {
  base: cx(
    "radix-side-top:animate-in",
    "radix-side-top:fade-in",
    "radix-side-right:animate-slide-left-fade",
    "radix-side-bottom:animate-slide-up-fade",
    "radix-side-left:animate-slide-right-fade",
    "inline-flex items-center rounded-md px-4 py-2.5"
  ),
  variants: {
    color: {
      sand: "bg-sand-1",
    },
  },
  defaultVariants: {
    color: "sand",
  },
});

const StyledTooltipArrow = styled(P.Arrow, {
  base: "fill-current text-sand-12 dark:text-sand-10",
  variants: {},
});

export const Tooltip = Object.assign(P.Root, {
  Provider: P.Provider,
  Trigger: P.Trigger,
  Content: StyledTooltipContent,
  Arrow: StyledTooltipArrow,
});
