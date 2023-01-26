import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled, VariantPropsOf } from "classname-variants/react";
import { HiCheck } from "react-icons/hi";

const StyledCheckboxRoot = styled(CheckboxPrimitive.Root, {
  base: "peer shrink-0 rounded-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    size: {
      sm: "h-4 w-4 ",
      lg: "h-6 w-6",
    },
    color: {
      sand: "border-sand-5 focus:ring-sand-7 bg-sand-1",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "sand",
  },
});

const StyledCheckboxIndicator = styled(CheckboxPrimitive.CheckboxIndicator, {
  base: "flex items-center justify-center",
  variants: {},
});

type CheckboxControlledProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
} & VariantPropsOf<typeof StyledCheckboxRoot>;

const CheckboxControlled = ({
  onChange,
  ...props
}: CheckboxControlledProps) => {
  return (
    <StyledCheckboxRoot onCheckedChange={onChange} {...props}>
      <StyledCheckboxIndicator>
        <HiCheck className="h-4 w-4" />
      </StyledCheckboxIndicator>
    </StyledCheckboxRoot>
  );
};

export const Checkbox = Object.assign(StyledCheckboxRoot, {
  Indicator: StyledCheckboxIndicator,
  Controlled: CheckboxControlled,
});
