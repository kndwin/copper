// import { styled } from "classname-variants/react";
import * as P from "@radix-ui/react-dropdown-menu";
import { styled, VariantPropsOf } from "classname-variants/react";
import cx from "classnames";

const Root = ({ children, ...props }: P.DropdownMenuProps) => {
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
const Content = ({
  children,
  ...props
}: P.DropdownMenuContentProps & VariantPropsOf<typeof StyledContent>) => {
  return (
    <P.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </P.Portal>
  );
};

export const Menu = Object.assign(Root, {
  Trigger,
  Content,
});
