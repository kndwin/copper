import { HiOutlineSaveAs, HiX } from "react-icons/hi";
import { match } from "ts-pattern";

import { Button, useToast } from "~/ui";
import { BackButton, InputTitle } from "~/features/common/Header";
import { Page, IconToggleDarkMode } from "~/features/layout";

import { useHitlistFormStore } from "./useHitlistFormStore";
import { trpc } from "~/utils/trpc";

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
  const formData = useHitlistFormStore((s) => s.formData);
  const mode = useHitlistFormStore((s) => s.mode);
  const utils = trpc.useContext();
  const { send } = useToast();

  const createOneMutation = trpc.hitlist.createOne.useMutation({
    onSuccess: () => {
      utils.hitlist.invalidate();
    },
  });

  const handleSaveHitlist = async () => {
    match(mode)
      .with("new", async () => {
        const formattedFormData = {
          ...formData,
          places: formData.places.map((place) => ({
            placeId: place.placeId as string,
          })),
        };
        const newHitlist = await createOneMutation.mutateAsync(
          formattedFormData
        );
        console.log({ newHitlist });
        send({
          description: `Created a new hitlist: ${newHitlist.title}`,
          title: `Success`,
          type: "success",
        });
      })
      .run();
  };

  const isSaveLoading = createOneMutation.isLoading;

  return (
    <Button
      loading={isSaveLoading}
      onClick={handleSaveHitlist}
      leftIcon={<HiOutlineSaveAs />}
    >
      Save
    </Button>
  );
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
