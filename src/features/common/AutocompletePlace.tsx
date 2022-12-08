import { type ChangeEvent, useState } from "react";

import { Popover, Input, Text } from "~/ui";
import { trpc } from "~/utils/trpc";
import { useDebouncedState } from "~/hooks";
import { type RouterOutputs } from "~/utils/trpc";
import { AiOutlineLoading } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";

export type TPlacePrediction = NonNullable<
  RouterOutputs["places"]["getAutocomplete"]
>["predictions"][number];

type TAutocompletePlaceProps = {
  onSelectPrediction: (prediction: TPlacePrediction) => void;
};

export const AutocompletePlace = ({
  onSelectPrediction,
}: TAutocompletePlaceProps) => {
  const [debouncedInput, setDebouncedInput] = useDebouncedState("", 200);
  const [openContent, setOpenContent] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const queryAutocomplete = trpc.places.getAutocomplete.useQuery(
    {
      text: debouncedInput,
    },
    {
      enabled: debouncedInput.length > 0,
      onSuccess: () => {
        isInputFocused && setOpenContent(true);
      },
    }
  );

  const handlePredictionSelection = (place: TPlacePrediction) => {
    onSelectPrediction(place);
    setOpenContent(false);
  };

  const isLoading = queryAutocomplete.isLoading && debouncedInput.length > 0;

  return (
    <Popover open={openContent} onOpenChange={(open) => setOpenContent(open)}>
      <Popover.Anchor className="flex gap-4">
        <Input
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          defaultValue={debouncedInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDebouncedInput(e.target.value)
          }
          placeholder="Enter a cafe"
        />
        {isLoading && <AiOutlineLoading className="h-8 w-8 animate-spin" />}
      </Popover.Anchor>
      <Popover.Content
        align="start"
        sideOffset={8}
        side="bottom"
        className="flex flex-col gap-2 py-1.5"
      >
        {queryAutocomplete.isError && (
          <div className="flex items-center gap-2">
            <Text className="text-red-12">Something went wrong</Text>
            <HiOutlineX className="h-8 w-8 text-red-10" />
          </div>
        )}
        {queryAutocomplete.data?.predictions.map((prediction) => {
          return (
            <div
              className="rounded border border-sand-6 bg-sand-3 px-3 py-2 hover:bg-sand-5"
              key={prediction.place_id}
              onClick={() => handlePredictionSelection(prediction)}
            >
              <Text className="font-bold">
                {prediction.structured_formatting.main_text}
              </Text>
              <Text>{prediction.structured_formatting.secondary_text}</Text>
            </div>
          );
        })}
      </Popover.Content>
    </Popover>
  );
};
