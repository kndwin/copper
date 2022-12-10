import { Fragment, type ReactNode } from "react";
import { styled, type VariantPropsOf } from "classname-variants/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cx from "classnames";
import { Transition } from "@headlessui/react";
import { dialogTransitionProps } from "./alert-dialog";

const DialogRoot = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const StyledDialogOverlay = styled(DialogPrimitive.Overlay, {
  base: "fixed inset-0 z-20 bg-[#101010]/25",
  variants: {},
});
const StyledDialogContent = styled(DialogPrimitive.Content, {
  base: cx(
    "fixed z-50 drop-shadow-lg bg-sand-3 border border-sand-9 overflow-hidden",

    "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-sand-6 focus-visible:ring-opacity-75"
  ),
  variants: {
    size: {
      md: "w-[95vw] max-w-md rounded-lg md:w-full",
      lg: "w-[95vw] max-w-[60em] rounded-lg md:w-full",
      xl: "w-[95vw] h-[95vh] max-w-[80em] rounded-lg md:w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const DialogTitle = styled(DialogPrimitive.Title, {
  base: "text-lg text-stone-300 font-bold",
  variants: {},
});

const DialogDescription = styled(DialogPrimitive.Description, {
  base: "text-sm text-stone-300",
  variants: {},
});

type DialogContentControlledProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: VariantPropsOf<typeof StyledDialogContent>["size"];
};

export const DialogContentControlled = (
  props: DialogContentControlledProps
) => {
  return (
    <DialogRoot {...props}>
      <Transition.Root show={props.open}>
        <Transition.Child as={Fragment} {...dialogTransitionProps.overlay}>
          <StyledDialogOverlay forceMount />
        </Transition.Child>
        <Transition.Child as={Fragment} {...dialogTransitionProps.content}>
          <StyledDialogContent size={props.size} forceMount>
            {props.children}
          </StyledDialogContent>
        </Transition.Child>
      </Transition.Root>
    </DialogRoot>
  );
};

export const Dialog = Object.assign(DialogRoot, {
  Content: StyledDialogContent,
  Trigger: DialogTrigger,
  Title: DialogTitle,
  Close: DialogPrimitive.Close,
  Description: DialogDescription,
  ContentControlled: DialogContentControlled,
});
