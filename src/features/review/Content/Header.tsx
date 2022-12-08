import { type ChangeEvent, useState } from "react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import { Status } from "@prisma/client";

import { Header, IconToggleDarkMode } from "~/features/layout";
import { HiArrowLeft, HiOutlineSaveAs, HiX } from "react-icons/hi";
import { Text, Button, Tag, Input, Menu, useToast, useAlert } from "~/ui";

import { useReviewFormStore } from "./useReviewFormStore";
import { useSession } from "next-auth/react";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";

export const ReviewHeader = () => {
  return (
    <Header>
      <div className="flex items-center gap-6">
        <Link href="/dashboard">
          <HiArrowLeft className="h-8 w-8 rounded-full bg-sand-4 p-2 hover:bg-sand-6" />
        </Link>
        <div className="flex items-center gap-4">
          <InputTitle />
          <TagStatus />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <IconToggleDarkMode />
        <AlertTest />
        <ButtonDelete />
        <ButtonSave />
      </div>
    </Header>
  );
};

const AlertTest = () => {
  const { send } = useAlert();
  return (
    <Button
      onClick={() =>
        send({
          title: "Are you sure",
          description: "Do you want to this?",
          onConfirm: () => {
            console.log("swag yolo");
          },
        })
      }
    >
      Test
    </Button>
  );
};

const ButtonDelete = () => {
  const formData = useReviewFormStore((s) => s.formData);
  const utils = trpc.useContext();
  const router = useRouter();
  const { send } = useToast();
  const deleteOneMutation = trpc.review.deleteOne.useMutation({
    onSuccess: () => {
      utils.places.getPlacesWithReviews.invalidate();
    },
  });

  const isDeleteLoading = deleteOneMutation.isLoading;

  const handleDeleteReview = async () => {
    const deletedReview = await deleteOneMutation.mutateAsync({
      where: {
        id: formData.id,
      },
    });

    send({
      description: `Sucessfully deleted a review: ${deletedReview.title}`,
      title: `Success`,
      type: "success",
    });

    router.push("/dashboard");
  };
  return (
    <Button
      color="red"
      size="lg"
      onClick={handleDeleteReview}
      disabled={isDeleteLoading}
    >
      {isDeleteLoading ? (
        <AiOutlineLoading className="h-4 w-4 animate-spin" />
      ) : (
        <HiX />
      )}
      Delete
    </Button>
  );
};
const ButtonSave = () => {
  const formData = useReviewFormStore((s) => s.formData);
  const utils = trpc.useContext();
  const { data } = useSession();
  const { send } = useToast();

  const createOneMutation = trpc.review.createOne.useMutation({
    onSuccess: () => {
      utils.places.getPlacesWithReviews.invalidate();
    },
  });

  const updateOneMutation = trpc.review.updateOne.useMutation({
    onSuccess: () => {
      utils.places.getPlacesWithReviews.invalidate();
    },
  });

  const isSaveLoading =
    createOneMutation.isLoading || updateOneMutation?.isLoading;

  const handleSaveReview = async () => {
    const isReviewNew = formData.id === "";
    if (isReviewNew) {
      // TODO(knd): Think about better validation framework
      if (!data?.user?.id) {
        throw Error("No user is found");
      }

      // TODO(knd): Think about better validation framework
      if (formData.placeId.length === 0) {
        throw Error("No place is found");
      }
      const newReview = await createOneMutation.mutateAsync(formData);
      send({
        description: `Sucessfully created a new review: ${newReview.title}`,
        title: `Success`,
        type: "success",
      });
    } else {
      const updatedReview = await updateOneMutation.mutateAsync(formData);
      send({
        description: `Sucessfully updated a review: ${updatedReview.title}`,
        title: `Success`,
        type: "success",
      });
    }
  };

  return (
    <Button size="lg" onClick={handleSaveReview} disabled={isSaveLoading}>
      {isSaveLoading ? (
        <AiOutlineLoading className="h-4 w-4 animate-spin" />
      ) : (
        <HiOutlineSaveAs />
      )}
      Save
    </Button>
  );
};

const InputTitle = () => {
  const title = useReviewFormStore((s) => s.formData.title);
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const [mode, setMode] = useState<"edit" | "view">("view");

  return (
    <>
      {mode === "view" && (
        <Text onClick={() => setMode("edit")} className="text-2xl font-bold">
          {title}
        </Text>
      )}
      {mode === "edit" && (
        <Input
          autoFocus
          className="text-2xl font-bold"
          defaultValue={title}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            setMode("view");
            setFormState("title", e.target.value);
          }}
        />
      )}
    </>
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
