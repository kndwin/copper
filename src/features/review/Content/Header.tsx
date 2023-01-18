import { Status } from "@prisma/client";
import { useRouter } from "next/router";
import { match } from "ts-pattern";
import { HiOutlineSaveAs, HiX } from "react-icons/hi";

import { Page, IconToggleDarkMode } from "~/features/layout";
import { Button, Tag, Menu, useToast, useAlert } from "~/ui";
import { BackButton, InputTitle } from "~/features/common/Header";
import { trpc } from "~/utils/trpc";

import { useReviewFormStore } from "./useReviewFormStore";

export const ReviewHeader = () => {
  const mode = useReviewFormStore((s) => s.mode);
  return (
    <Page.Header>
      <div className="flex items-center gap-6">
        <BackButton />
        <div className="flex items-center gap-4">
          <ReviewInputTitle />
          <TagStatus />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <IconToggleDarkMode />
        {mode === "update" && <ButtonDelete />}
        <ButtonSave />
      </div>
    </Page.Header>
  );
};

const ButtonDelete = () => {
  const formData = useReviewFormStore((s) => s.formData);
  const utils = trpc.useContext();
  const router = useRouter();
  const { send: sendToast } = useToast();
  const { send: sendAlert } = useAlert();

  const { isLoading, mutateAsync } = trpc.review.deleteOne.useMutation({
    onSuccess: () => {
      utils.places.getManyPlacesWithReviews.invalidate();
    },
  });

  const handleDeleteReview = async () => {
    const deletedReview = await mutateAsync({
      id: formData.id,
    });

    sendToast({
      description: `Sucessfully deleted a review: ${deletedReview.title}`,
      title: `Success`,
      type: "success",
    });

    router.push("/dashboard");
  };

  return (
    <Button
      color="red"
      onClick={() =>
        sendAlert({
          title: "Are you sure",
          description: "Do you want to this?",
          onConfirm: handleDeleteReview,
        })
      }
      leftIcon={<HiX />}
      loading={isLoading}
    >
      Delete
    </Button>
  );
};

const ButtonSave = () => {
  const formData = useReviewFormStore((s) => s.formData);
  const mode = useReviewFormStore((s) => s.mode);
  const utils = trpc.useContext();
  const { send } = useToast();

  const createOneMutation = trpc.review.createOne.useMutation({
    onSuccess: () => {
      utils.places.getManyPlacesWithReviews.invalidate();
    },
  });

  const updateOneMutation = trpc.review.updateOne.useMutation({
    onSuccess: () => {
      utils.places.getManyPlacesWithReviews.invalidate();
    },
  });

  const isSaveLoading =
    createOneMutation.isLoading || updateOneMutation?.isLoading;

  const handleSaveReview = async () => {
    match(mode)
      .with("new", async () => {
        const newReview = await createOneMutation.mutateAsync(formData);
        send({
          description: `Sucessfully created a new review: ${newReview.title}`,
          title: `Success`,
          type: "success",
        });
      })
      .with("update", async () => {
        const updatedReview = await updateOneMutation.mutateAsync(formData);
        send({
          description: `Sucessfully updated a review: ${updatedReview.title}`,
          title: `Success`,
          type: "success",
        });
      })
      .exhaustive();
  };

  return (
    <Button
      onClick={handleSaveReview}
      loading={isSaveLoading}
      leftIcon={<HiOutlineSaveAs />}
    >
      Save
    </Button>
  );
};

const ReviewInputTitle = () => {
  const title = useReviewFormStore((s) => s.formData.title);
  const setFormState = useReviewFormStore((s) => s.setFormState);

  return (
    <InputTitle
      value={title}
      onChange={(newTitle) => setFormState("title", newTitle)}
    />
  );
};

const TagStatus = () => {
  const status = useReviewFormStore((s) => s.formData.status);
  const setFormState = useReviewFormStore((s) => s.setFormState);
  return (
    <>
      <Menu>
        <Menu.Trigger asChild>
          <Tag as="button">{status}</Tag>
        </Menu.Trigger>
        <Menu.Content sideOffset={8} size="fit" className="flex flex-col gap-2">
          {Object.values(Status).map((status) => (
            <Menu.Item key={status} asChild>
              <Tag
                className="w-fit"
                as="button"
                onClick={() => setFormState("status", status)}
              >
                {status}
              </Tag>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
    </>
  );
};
