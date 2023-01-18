import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { type ChangeEvent, useState } from "react";

import { Text, Input } from "~/ui";

type BackButtonProps = {
  href?: string;
};

export const BackButton = ({ href = "/dashboard" }: BackButtonProps) => (
  <Link href={href}>
    <HiArrowLeft className="h-8 w-8 rounded-full bg-sand-4 p-2 hover:bg-sand-6" />
  </Link>
);

type InputTitleProps = {
  value: string;
  onChange: (value: string) => void;
};
export const InputTitle = ({ value, onChange }: InputTitleProps) => {
  const [mode, setMode] = useState<"edit" | "view">("view");

  return (
    <>
      {mode === "view" && (
        <Text onClick={() => setMode("edit")} className="text-2xl font-bold">
          {value}
        </Text>
      )}
      {mode === "edit" && (
        <Input
          autoFocus
          className="text-2xl font-bold"
          defaultValue={value}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            setMode("view");
            onChange(e.target.value);
          }}
        />
      )}
    </>
  );
};
