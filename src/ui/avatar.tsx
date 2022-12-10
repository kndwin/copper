import * as P from "@radix-ui/react-avatar";
import { styled } from "classname-variants/react";

const Root = P.Root;
const StyledImage = styled(P.Image, {
  base: "rounded-full",
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Avatar = Object.assign(Root, {
  Image: StyledImage,
  Fallback: P.AvatarFallback,
});
