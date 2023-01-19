import { useEffect, useState, type ChangeEvent } from "react";
import { Input, Text } from "~/ui";
import { useHitlistFormStore } from "./useHitlistFormStore";
import {
  type TPlacePrediction,
  AutocompletePlace,
  Box,
  Label,
} from "~/features/common";

export const HitlistContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <HitlistDescription />
      <HitlistSearchPlace />
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
        className="h-[10em] w-full rounded border border-sand-8 bg-sand-2 py-2 px-3 outline-sand-6 ring-sand-8"
      />
    </Box>
  );
};

const HitlistSearchPlace = () => {
  const setFormState = useHitlistFormStore((s) => s.setFormState);
  const [placesWithDetails, setPlacesWithDetails] = useState<
    TPlacePrediction[]
  >([]);

  const handleAppendPlace = (place: TPlacePrediction) => {
    setPlacesWithDetails((prev) => pushIfNew(prev, place, "place_id"));
  };

  useEffect(() => {
    setFormState(
      "places",
      placesWithDetails.map((place) => ({
        placeId: place.place_id,
      }))
    );
  }, [placesWithDetails, setFormState]);

  return (
    <Box>
      <div className="flex gap-4">
        <Label>Hitlist</Label>
      </div>
      <AutocompletePlace
        onSelectPrediction={(prediction) => {
          handleAppendPlace(prediction);
        }}
        inputProps={{
          className: "max-w-sm",
        }}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {placesWithDetails.map((place) => (
          <div
            key={place.place_id}
            className="flex flex-col rounded-sm border border-sand-8 bg-sand-3 px-4 py-2"
          >
            <Text className="font-bold">
              {place.structured_formatting.main_text}
            </Text>
            <Text className="text-sm">{place.description}</Text>
          </div>
        ))}
      </div>
    </Box>
  );
};

function pushIfNew<T>(array: T[], item: T, field: keyof T): T[] {
  if (!array.some((i) => i[field] === item[field])) {
    return [...array, item];
  }
  return [...array];
}
