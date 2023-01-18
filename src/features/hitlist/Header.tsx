import { HiOutlineSaveAs, HiX } from "react-icons/hi";

import { Button } from "~/ui";
import { BackButton, InputTitle } from "~/features/common/Header";
import { Page, IconToggleDarkMode } from "~/features/layout";

import { useHitlistFormStore } from "./useHitlistFormStore";

export const HitlistHeader = () => {
  const mode = useHitlistFormStore((s) => s.mode);
  return (
    <Page.Header>
      <div className="flex items-center gap-2">
        <BackButton href="/dashboard/hitlist" />
        <HitlistInputTitle />
      </div>
      <div className="flex items-center gap-4">
        <IconToggleDarkMode />
        {mode === "update" && <ButtonDelete />}
        <ButtonSave />
      </div>
    </Page.Header>
  );
};

const ButtonSave = () => {
  return <Button leftIcon={<HiOutlineSaveAs />}>Save</Button>;
};

const ButtonDelete = () => {
  return (
    <Button color="red" leftIcon={<HiX />}>
      Delete
    </Button>
  );
};

const HitlistInputTitle = () => {
  const title = useHitlistFormStore((s) => s.formData.title);
  const setFormData = useHitlistFormStore((s) => s.setFormState);
  return (
    <InputTitle
      value={title}
      onChange={(value) => setFormData("title", value)}
    />
  );
};
