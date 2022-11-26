import * as P from "@radix-ui/react-select";
import { styled, VariantPropsOf } from "classname-variants/react";
import cx from "classnames";

const Root = ({ children, ...props }: P.SelectProps) => {
  return (
    <div className="relative">
      <P.Root {...props}>{children}</P.Root>
    </div>
  );
};

const Trigger = P.Trigger;

const StyledViewport = styled(P.Viewport, {
  base: cx(
    "radix-side-top:animate-in radix-side-top:fade-in-50",
    "radix-side-bottom:animate-in radix-side-bottom:fade-in-50"
  ),
  variants: {
    color: {
      sand: "bg-sand-2",
    },
    size: {
      md: "w-48 rounded-lg bg-sand-2 px-1.5 py-1 md:w-56",
    },
  },
  defaultVariants: {
    color: "sand",
    size: "md",
  },
});

const Content2 = ({
  children,
  ...props
}: P.SelectContentProps & VariantPropsOf<typeof StyledViewport>) => {
  return (
    <P.Content>
      <StyledViewport {...props}>{children}</StyledViewport>
    </P.Content>
  );
};

export const Select = Object.assign(Root, {
  Trigger,
  Content2,
  Item: P.Item,
  Text: P.ItemText,
});
