import { Fragment, ReactNode } from "react";
import { styled } from "classname-variants/react";
import { atom, useAtom } from "jotai";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import cx from "classnames";
import { Transition } from "@headlessui/react";

const AlertDialogRoot = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const StyledAlertDialogOverlay = styled(AlertDialogPrimitive.Overlay, {
  base: "fixed inset-0 z-20 bg-[#101010]/25",
  variants: {},
});
const StyledAlertDialogContent = styled(AlertDialogPrimitive.Content, {
  base: cx(
    "fixed z-50 drop-shadow-lg bg-[#282828] border border-stone-500",
    "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
    "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-stone-500 focus-visible:ring-opacity-75"
  ),
  variants: {},
});
const AlertDialogTitle = styled(AlertDialogPrimitive.Title, {
  base: "text-lg text-stone-300 font-bold",
  variants: {},
});
const AlertDialogDescription = styled(AlertDialogPrimitive.Description, {
  base: "text-sm text-stone-300",
  variants: {},
});
const AlertDialogCancel = styled(AlertDialogPrimitive.Cancel, {
  base: cx(
    "px-2 py-1 rounded-md text-stone-300 ",
    "bg-stone-800 text-sm",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-stone-500 focus-visible:ring-opacity-75"
  ),
  variants: {},
});
const AlertDialogAction = styled(AlertDialogPrimitive.Action, {
  base: cx(
    "px-2 py-1 rounded-md text-stone-800 border border-stone-500",
    "bg-stone-400 font-bold text-sm",
    "focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-stone-500 focus-visible:ring-opacity-75"
  ),
  variants: {},
});

type AlertDialogContentControlledProps = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const dialogTransitionProps = {
  overlay: {
    enter: "ease-out duration-200",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  },
  content: {
    enter: "ease-out duration-100",
    enterFrom: "opacity-0 scale-95",
    enterTo: "opacity-100 scale-100",
    leave: "ease-in duration-100",
    leaveFrom: "opacity-100 scale-100",
    leaveTo: "opacity-0 scale-95",
  },
};

export const AlertDialogContentControlled = (
  props: AlertDialogContentControlledProps
) => {
  return (
    <AlertDialogRoot>
      <Transition.Root show={props.open}>
        <Transition.Child as={Fragment} {...dialogTransitionProps.overlay}>
          <StyledAlertDialogOverlay forceMount />
        </Transition.Child>
        <Transition.Child as={Fragment} {...dialogTransitionProps.content}>
          <StyledAlertDialogContent forceMount>
            {props.children}
          </StyledAlertDialogContent>
        </Transition.Child>
      </Transition.Root>
    </AlertDialogRoot>
  );
};

type TAlert = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
};

export type TSendAlert = Omit<TAlert, "open">;

const alertAtom = atom({
  open: false,
  title: "",
  description: "",
  onConfirm: () => {},
});

export const useAlert = () => {
  const [alert, setAlert] = useAtom(alertAtom);

  const send = (alertToSend: TSendAlert) => {
    setAlert({ ...alertToSend, open: true });
  };

  const onOpenChange = (isOpen: boolean) => {
    setAlert({ ...alert, open: isOpen });
  };

  return {
    send,
    alert: alert as TAlert,
    onOpenChange,
  };
};

export const AlertDialogMessages = () => {
  const { alert, onOpenChange } = useAlert();
  return (
    <AlertDialogContentControlled
      open={alert.open}
      onOpenChange={onOpenChange}
      onConfirm={alert.onConfirm}
    >
      <AlertDialog.Title>{alert.title}</AlertDialog.Title>
      <AlertDialog.Description>{alert.description}</AlertDialog.Description>
      <div className="mt-4 flex items-center justify-end gap-2">
        <AlertDialog.Cancel onClick={() => onOpenChange(false)}>
          Cancel
        </AlertDialog.Cancel>
        <AlertDialog.Action
          onClick={async () => {
            await alert.onConfirm();
            onOpenChange(false);
          }}
        >
          Confirm
        </AlertDialog.Action>
      </div>
    </AlertDialogContentControlled>
  );
};

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Content: StyledAlertDialogContent,
  Trigger: AlertDialogTrigger,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
  ContentControlled: AlertDialogContentControlled,
  Messages: AlertDialogMessages,
});
