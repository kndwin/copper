import { Header, IconToggleDarkMode } from "~/features/layout";
import { HiArrowLeft, HiOutlineSaveAs } from "react-icons/hi";
import { Text, Button, Tag, Input } from "~/ui";
import Link from "next/link";

import { SearchCafe } from "./SearchCafe";
import { SBox, SLabel } from "./common";
import { useReviewFormStore } from "./useReviewFormStore";
import { type ChangeEvent } from "react";
import { Quality } from "@prisma/client";

export const NewReview = () => {
  return (
    <div className="flex w-full flex-col gap-y-6 pb-12">
      <SearchCafe />
      <InputSocial />
      <MarkdownReview />
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <OptionCoffee />
        <OptionFood />
        <OptionPowerpoint />
        <OptionWifi />
      </div>
    </div>
  );
};

const InputSocial = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  return (
    <SBox>
      <SLabel>Social</SLabel>
      <SBox variant="grid">
        <SBox>
          <SLabel size="sm">Instagram</SLabel>
          <Input
            placeholder="Instagram"
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState("socialInstagram", e.target.value)
            }
          />
        </SBox>
        <SBox>
          <SLabel size="sm">Facebook</SLabel>
          <Input
            placeholder="Facebook"
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState("socialFacebook", e.target.value)
            }
          />
        </SBox>
      </SBox>
    </SBox>
  );
};

const MarkdownReview = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);

  return (
    <SBox>
      <SLabel>Review</SLabel>
      <textarea
        onBlur={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setFormState("review", e.target.value)
        }
        className="h-[10em] w-full rounded bg-sand-2 py-2 px-3 outline-sand-6 ring-1 ring-sand-8"
      />
    </SBox>
  );
};

const OptionCoffee = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const coffee = useReviewFormStore((s) => s.formData.coffee);

  const handleSelectCoffeeOption = (option: Quality) => {
    setFormState<"coffee">("coffee", option);
  };
  return (
    <SBox>
      <SLabel>Coffee</SLabel>
      <div className="flex items-center gap-2">
        {Object.values(Quality).map((option) => (
          <Button
            key={option}
            onClick={() => handleSelectCoffeeOption(option)}
            variant={coffee === option ? "filled" : "default"}
            className="capitalize"
          >
            {option.toLowerCase()}
          </Button>
        ))}
      </div>
    </SBox>
  );
};

const OptionFood = () => {
  return (
    <SBox>
      <SLabel>Food</SLabel>
      <div className="flex items-center gap-2">
        <Button>N/A</Button>
        <Button>Poor</Button>
        <Button>Okay</Button>
        <Button>Good</Button>
      </div>
    </SBox>
  );
};

const OptionPowerpoint = () => {
  return (
    <SBox>
      <SLabel>Powerpoint</SLabel>
      <div className="flex items-center gap-2">
        <Button>No</Button>
        <Button>Yes, Limited</Button>
        <Button>Yes, Many</Button>
      </div>
    </SBox>
  );
};

const OptionWifi = () => {
  return (
    <SBox>
      <SLabel>Wifi</SLabel>
      <div className="flex items-center gap-2">
        <Button>No</Button>
        <Button>Yes, Weak</Button>
        <Button>Yes, Strong</Button>
      </div>
    </SBox>
  );
};

export const NewReviewHeader = () => {
  return (
    <Header>
      <div className="flex items-center gap-6">
        <Link href="/dashboard">
          <HiArrowLeft className="h-8 w-8 rounded-full bg-sand-4 p-2 hover:bg-sand-6" />
        </Link>
        <div className="flex items-center gap-4">
          <Text className="text-2xl font-bold">New Review</Text>
          <Tag>DRAFT</Tag>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <IconToggleDarkMode />
        <Button size="lg">
          <HiOutlineSaveAs />
          Save
        </Button>
      </div>
    </Header>
  );
};
