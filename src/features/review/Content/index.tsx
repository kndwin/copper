import { type ChangeEvent } from "react";
import { Powerpoints, Quality, Wifi } from "@prisma/client";
import { Button, Input } from "~/ui";
import { Box, Label } from "~/features/common";

import { SearchCafe } from "./SearchCafe";
import { useReviewFormStore } from "./useReviewFormStore";

export * from "./Header";

export const ReviewContent = () => {
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
    <Box>
      <Label>Social</Label>
      <Box variant="grid">
        <Box>
          <Label size="sm">Instagram</Label>
          <Input
            placeholder="Instagram"
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState("socialInstagram", e.target.value)
            }
          />
        </Box>
        <Box>
          <Label size="sm">Facebook</Label>
          <Input
            placeholder="Facebook"
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState("socialFacebook", e.target.value)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

const MarkdownReview = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);

  return (
    <Box>
      <Label>Review</Label>
      <textarea
        onBlur={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setFormState("review", e.target.value)
        }
        className="h-[10em] w-full rounded bg-sand-2 py-2 px-3 outline-sand-6 ring-1 ring-sand-8"
      />
    </Box>
  );
};

const OptionCoffee = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const coffee = useReviewFormStore((s) => s.formData.coffee);

  const handleSelectCoffeeOption = (option: Quality) => {
    setFormState<"coffee">("coffee", option);
  };
  return (
    <Box>
      <Label>Coffee</Label>
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
    </Box>
  );
};

const OptionFood = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const food = useReviewFormStore((s) => s.formData.food);

  const handleSelectFoodOption = (option: Quality) => {
    setFormState<"food">("food", option);
  };
  return (
    <Box>
      <Label>Food</Label>
      <div className="flex items-center gap-2">
        {Object.values(Quality).map((option) => (
          <Button
            key={option}
            onClick={() => handleSelectFoodOption(option)}
            variant={food === option ? "filled" : "default"}
            className="capitalize"
          >
            {option.toLowerCase()}
          </Button>
        ))}
      </div>
    </Box>
  );
};

const OptionPowerpoint = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const powerpoints = useReviewFormStore((s) => s.formData.powerpoints);

  const handleSelectPowerpointsOption = (option: Powerpoints) => {
    setFormState<"powerpoints">("powerpoints", option);
  };
  return (
    <Box>
      <Label>Powerpoint</Label>
      <div className="flex items-center gap-2">
        {Object.values(Powerpoints).map((option) => (
          <Button
            key={option}
            onClick={() => handleSelectPowerpointsOption(option)}
            variant={powerpoints === option ? "filled" : "default"}
            className="capitalize"
          >
            {option.toLowerCase()}
          </Button>
        ))}
      </div>
    </Box>
  );
};

const OptionWifi = () => {
  const setFormState = useReviewFormStore((s) => s.setFormState);
  const wifi = useReviewFormStore((s) => s.formData.wifi);

  const handleSelectWifiOption = (option: Wifi) => {
    setFormState<"wifi">("wifi", option);
  };

  return (
    <Box>
      <Label>Wifi</Label>
      <div className="flex items-center gap-2">
        {Object.values(Wifi).map((option) => (
          <Button
            key={option}
            onClick={() => handleSelectWifiOption(option)}
            variant={wifi === option ? "filled" : "default"}
            className="capitalize"
          >
            {option.toLowerCase()}
          </Button>
        ))}
      </div>
    </Box>
  );
};
