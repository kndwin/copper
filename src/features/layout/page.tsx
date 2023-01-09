import { styled, type VariantPropsOf } from "classname-variants/react";

const StyledContainer = styled("div", {
  base: "min-h-screen w-full bg-sand-2 text-sage-12",
  variants: {},
});

const StyledContent = styled("div", {
  base: "mx-auto max-w-[60em] px-2",
  variants: {},
});

const StyledHeader = styled("header", {
  base: "flex items-center justify-between gap-2 border-b border-sand-6 p-4",
  variants: {},
});

const StyledMain = styled("main", {
  base: "container mx-auto flex h-full flex-col px-8",
  variants: {},
});

type RootProps = VariantPropsOf<typeof StyledContainer>;
const Root = ({ children, ...props }: RootProps) => {
  return (
    <StyledContainer {...props}>
      <StyledContent>{children}</StyledContent>
    </StyledContainer>
  );
};

export const Page = Object.assign(Root, {
  Content: StyledContent,
  Header: StyledHeader,
  Main: StyledMain,
});
