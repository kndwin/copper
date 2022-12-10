import { styled, type VariantPropsOf } from "classname-variants/react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import cx from "classnames";

const CollapsibleRoot = CollapsiblePrimitive.Root;
const CollapsibleTrigger = styled(CollapsiblePrimitive.Trigger, {
  base: "focus:outline-none focus-visible:ring",
  variants: {
    color: {
      sand: "ring-sand-6",
    },
  },
  defaultVariants: {
    color: "sand",
  },
});
const CollapsibleContent = CollapsiblePrimitive.Content;

export const Collapsible = Object.assign(CollapsibleRoot, {
  Content: CollapsibleContent,
  Trigger: CollapsibleTrigger,
});
