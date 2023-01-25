import { styled } from "classname-variants/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const CollapsibleRoot = styled(
  CollapsiblePrimitive.Root,
  "radix-state-open:fade-in-50"
);

const CollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
  base: "focus:outline-none focus-visible:ring-1 ",
  variants: {
    color: {
      sand: "ring-sand-6",
    },
  },
  defaultVariants: {
    color: "sand",
  },
});
const CollapsibleContent = styled(CollapsiblePrimitive.Content, {
  base: "bg-sand-1",
  variants: {},
});

export const Collapsible = Object.assign(CollapsibleRoot, {
  Content: CollapsibleContent,
  Trigger: CollapsibleTrigger,
});
