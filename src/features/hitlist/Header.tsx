import { useCallback } from "react";
import { HiOutlineSaveAs, HiX } from "react-icons/hi";
import { match } from "ts-pattern";

import { Button, useToast } from "~/ui";
import { BackButton, InputTitle } from "~/features/common/Header";
import { Page, IconToggleDarkMode } from "~/features/layout";

import { useHitlistFormStore } from "./useHitlistFormStore";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";

export const HitlistHeader = () => {
  const mode = useHitlistFormStore((s) => s.mode);
  return (
    <Page.Header>
      <div className="flex items-center gap-4">
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
  const router = useRouter();
  const { send } = useToast();

  const createOneMutation = trpc.hitlist.createOne.useMutation({
    onSuccess: () => {
      utils.hitlist.invalidate();
    },
  });

  const updateOneMutation = trpc.hitlist.updateOne.useMutation({
    onSuccess: () => {
      utils.hitlist.invalidate();
    },
  });

  const handleSaveHitlist = useCallback(async () => {
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
        send({
          description: `Created a new hitlist: ${newHitlist.title}`,
          title: `Success`,
          type: "success",
        });
        router.push(`/dashboard/hitlist/${newHitlist.id}`);
      })
      .with("update", async () => {
        console.log({ formData });
        const updatedHitlist = await updateOneMutation.mutateAsync(formData);
        send({
          description: `Updated a new hitlist: ${updatedHitlist.title}`,
          title: `Success`,
          type: "success",
        });
      })
      .run();
  }, [mode, formData]);

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
