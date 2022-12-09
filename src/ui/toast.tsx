import { styled } from "classname-variants/react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { atom, useAtom } from "jotai";
import { match } from "ts-pattern";
import cx from "classnames";
import { Text } from "./text";

import {
  HiCheckCircle,
  HiXCircle,
  HiX,
  HiInformationCircle,
} from "react-icons/hi";

const ToastProvider = ToastPrimitive.ToastProvider;
const ToastRoot = styled(ToastPrimitive.Root, {
  base: cx(
    "z-50 fixed w-60 p-3  rounded text-sand-12",
    "radix-state-open:animate-in radix-state-open:slide-in-from-bottom",
    "radix-state-closed:animate-out radix-state-closed:slide-out-from-top",
    "radix-swipe-end:animate-out radix-swipe-end:slide-out-from-left",
    "translate-x-radix-toast-swipe-move-x",
    "radix-swipe-cancel:translate-x-0 radix-swipe-cancel:duration-200",
    "radix-swipe-cancel:ease-[ease]",
    "focus:outline-none focus-visible:ring"
  ),
  variants: {
    position: {
      bottomRight: "bottom-4 right-4",
      bottomLeft: "bottom-4 left-4",
      topRight: "top-4 right-4",
      topLeft: "top-4 left-4",
    },
    colors: {
      success: cx(
        "bg-sand-2 border border-sand-6",
        "focus-visible:ring-sand-5 focus-visible:ring-opacity-75"
      ),
      error: cx(
        "bg-red-2 dark:bg-red-10",
        "focus-visible:ring-red-5 focus-visible:ring-opacity-75"
      ),
      info: cx(
        "bg-sand-2 dark:bg-sand-10",
        "focus-visible:ring-sand-5 focus-visible:ring-opacity-75"
      ),
    },
  },
  defaultVariants: {
    colors: "success",
    position: "bottomRight",
  },
});
const ToastTitle = ToastPrimitive.Title;
const ToastDescription = ToastPrimitive.Description;
const ToastAction = ToastPrimitive.Action;
const ToastClose = ToastPrimitive.Close;

type TToast = {
  open: boolean;
  title: string;
  description: string;
  type: "success" | "error" | "info";
};

export type TSendToast = Omit<TToast, "open">;

const toastAtom = atom({
  open: false,
  title: "",
  description: "",
  type: "success",
});

export const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);

  const send = (toastToSend: TSendToast) => {
    setToast({ ...toastToSend, open: true });
  };

  const onOpenChange = (isOpen: boolean) => {
    setToast({ ...toast, open: isOpen });
  };

  return {
    send,
    toast: toast as TToast,
    onOpenChange,
  };
};

const ToastMessages = () => {
  const { toast, onOpenChange } = useToast();

  const toastDecorators = match(toast.type)
    .with("success", () => ({
      icon: <HiCheckCircle className="fill-grass-12" size={24} />,
    }))
    .with("error", () => ({
      icon: <HiXCircle className="fill-red-12" size={24} />,
    }))
    .with("info", () => ({
      icon: <HiInformationCircle className="fill-sand-12" size={24} />,
    }))
    .exhaustive();

  return (
    <>
      <Toast open={toast.open} colors={toast.type} onOpenChange={onOpenChange}>
        <div className="flex w-60 pr-2">
          <Toast.Close className="absolute top-3 right-3">
            <HiX />
          </Toast.Close>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {toastDecorators.icon}
              <Text as={ToastTitle} className="text-base font-bold">
                {toast.title}
              </Text>
            </div>
            <Text as={ToastDescription}>{toast.description}</Text>
          </div>
        </div>
      </Toast>
      <Toast.Viewport />
    </>
  );
};

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  Viewport: ToastPrimitive.Viewport,
  Messages: ToastMessages,
});
