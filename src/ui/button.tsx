import { AiOutlineLoading } from "react-icons/ai";
import { styled, type VariantPropsOf } from "classname-variants/react";
import React, { type ReactNode } from "react";
import { match, P } from "ts-pattern";

const StyledButton = styled("button", {
  base: "flex items-center rounded",
  variants: {
    disabled: {
      true: "",
    },
    loading: {
      true: "",
    },
    variant: {
      default: "",
      filled: "",
      outline: "",
    },
    color: {
      sand: "bg-sand-4 hover:bg-sand-6 outline-sand-8",
      red: "bg-red-4 hover:bg-red-6 outline-red-8",
    },
    size: {
      md: "px-2 py-1 gap-2",
      lg: "px-4 py-2 gap-4",
    },
  },
  compoundVariants: [
    {
      variants: {
        color: "sand",
        disabled: true,
      },
      className: "bg-sand-2",
    },
    {
      variants: {
        color: "sand",
        loading: true,
      },
      className: "bg-sand-2",
    },
    {
      variants: {
        color: "sand",
        variant: "filled",
      },
      className:
        "bg-sand-12 text-sand-1 dark:bg-sand-1 dark:text-sand-12 hover:bg-sand-12",
    },
    {
      variants: {
        color: "sand",
        variant: "outline",
      },
      className: "bg-transparent ring-1 ring-sand-6 hover:bg-sand-3",
    },
    {
      variants: {
        color: "red",
        variant: "filled",
      },
      className: "bg-red-10 text-red-1 hover:bg-red-10",
    },
  ],
  defaultVariants: {
    size: "md",
    color: "sand",
    variant: "default",
  },
});

type ButtonProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & VariantPropsOf<typeof StyledButton>;

export const Button = ({
  children,
  leftIcon = null,
  rightIcon = null,
  ...props
}: ButtonProps) => {
  const { loading } = props;
  return (
    <StyledButton {...props}>
      <LoadingContainer
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        loading={loading}
        size={props.size}
      >
        {children}
      </LoadingContainer>
    </StyledButton>
  );
};

type LoadingContainerProps = {
  children: ReactNode;
  leftIcon: ReactNode | null;
  rightIcon: ReactNode | null;
  loading?: boolean;
  size: VariantPropsOf<typeof StyledButton>["size"];
};

const LoadingContainer = ({
  children,
  leftIcon,
  rightIcon,
  loading,
  size,
}: LoadingContainerProps) => {
  const position = match([Boolean(leftIcon), Boolean(rightIcon)])
    .with([true, true], () => "both")
    .with([false, true], () => "right")
    .with([true, false], () => "left")
    .with([false, false], () => "none")
    .otherwise(() => "unknown");

  const status = match(Boolean(loading))
    .with(false, () => "idle")
    .with(true, () => "loading")
    .exhaustive();

  const render = match([position, status] as const)
    .with(P.union(["left", "loading"], ["none", "loading"]), () => (
      <>
        <LoadingSpinner size={size} />
        {children}
      </>
    ))
    .with(["left", "idle"], () => (
      <>
        {leftIcon}
        {children}
      </>
    ))
    .with(["right", "loading"], () => (
      <>
        {children}
        <LoadingSpinner size={size} />
      </>
    ))
    .with(["right", "idle"], () => (
      <>
        {children}
        {rightIcon}
      </>
    ))
    .otherwise(() => <>{children}</>);

  return render;
};

const LoadingSpinner = styled(AiOutlineLoading, {
  base: "animate-spin",
  variants: {
    size: {
      md: "h-4 w-4",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
