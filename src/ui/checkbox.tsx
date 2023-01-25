import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { styled } from "classname-variants/react";
import { HiCheck } from "react-icons/hi";
import { variants } from "classname-variants/*";

const StyledCheckboxRoot = styled(CheckboxPrimitive.Root, {
  base: "peer shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
  variants: {
    size: {
      sm: "h-4 w-4 ",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const StyledCheckboxIndicator = styled(CheckboxPrimitive.CheckboxIndicator, {
  base: "flex items-center justify-center",
  variants: {},
});

type CheckboxControlledProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};
const CheckboxControlled = (props: CheckboxControlledProps) => {
  return (
    <StyledCheckboxRoot
      checked={props.checked}
      onCheckedChange={props.onChange}
    >
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
