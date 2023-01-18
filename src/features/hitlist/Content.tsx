import { type ChangeEvent } from "react";
import { Text } from "~/ui";
import { useHitlistFormStore } from "./useHitlistFormStore";
import { Box, Label } from "~/features/common";

export const HitlistContent = () => {
  return (
    <div>
      <HitlistDescription />
    </div>
  );
};

const HitlistDescription = () => {
  const description = useHitlistFormStore((s) => s.formData.description);
  const setFormState = useHitlistFormStore((s) => s.setFormState);
  return (
    <Box>
      <div className="flex gap-4">
        <Label>Description</Label>
      </div>

      <textarea
        onBlur={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setFormState("description", e.target.value)
        }
        defaultValue={`${description}`}
        className="h-[10em] w-full rounded bg-sand-2 py-2 px-3 outline-sand-6 ring-1 ring-sand-8"
      />
    </Box>
  );
};
