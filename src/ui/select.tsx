import * as P from "@radix-ui/react-select";
import { forwardRef } from "react";
import { styled, VariantPropsOf } from "classname-variants/react";
import cx from "classnames";
import { HiCheck } from "react-icons/hi";

const Root = P.Root;

const StyledTrigger = styled(P.Trigger, {
  base: "flex items-center gap-2 rounded",
  variants: {
    color: {
      sand: "bg-sand-4 hover:bg-sand-6 outline-sand-8",
    },
    size: {
      md: "px-2 py-1 w-fit",
    },
  },
  defaultVariants: {
    size: "md",
    color: "sand",
  },
});

const StyledViewport = styled(P.Viewport, {
  base: cx(
    "radix-side-top:animate-in radix-side-top:fade-in-50",
    "radix-side-bottom:animate-in radix-side-bottom:fade-in-50"
  ),
  variants: {
    color: {
      sand: "bg-sand-2 ring-1 ring-sand-6",
    },
    size: {
      md: "rounded bg-sand-2 p-1",
    },
  },
  defaultVariants: {
    color: "sand",
    size: "md",
  },
});

const StyledItem = styled(P.Item, {
  base: "flex gap-2 items-center relative",
  variants: {
    color: {
      sand: "bg-sand-2 outline-sand-4 hover:bg-sand-4",
    },
    size: {
      md: "pr-2 pl-8 py-1 rounded",
    },
  },
  defaultVariants: {
    color: "sand",
    size: "md",
  },
});

const SelectItem = forwardRef<
  HTMLInputElement,
  P.SelectItemProps & VariantPropsOf<typeof StyledItem>
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <P.ItemIndicator className="absolute left-2">
        <HiCheck />
      </P.ItemIndicator>
      <P.ItemText>{children}</P.ItemText>
    </StyledItem>
  );
});

SelectItem.displayName = "Item";

export const Select = Object.assign(Root, {
  Trigger: StyledTrigger,
  Icon: P.Icon,
  Value: P.Value,
  Content: P.Content,
  Portal: P.Portal,
  Viewport: StyledViewport,
  Item: SelectItem,
  Text: P.ItemText,
});
