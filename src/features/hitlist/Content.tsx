import { useEffect, useState, type ChangeEvent } from "react";
import { Text, Checkbox, Button } from "~/ui";
import { useHitlistFormStore } from "./useHitlistFormStore";
import {
  type TPlacePrediction,
  AutocompletePlace,
  Box,
  Label,
} from "~/features/common";
import { type HitListPlace, type PlaceDetails } from "@prisma/client";
import produce from "immer";

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

type HitlistPlaceWithDetails = Partial<HitListPlace> & {
  place?: Partial<PlaceDetails>;
};

const HitlistSearchPlace = () => {
  const setFormState = useHitlistFormStore((s) => s.setFormState);
  const places = useHitlistFormStore((s) => s.formData.places);
  const formData = useHitlistFormStore((s) => s.formData);
  const mode = useHitlistFormStore((s) => s.mode);
  const [placesWithDetails, setPlacesWithDetails] = useState<
    HitlistPlaceWithDetails[]
  >([]);

  const handleAppendPlace = (place: HitlistPlaceWithDetails) => {
    setPlacesWithDetails((prev) => pushIfNew(prev, place, "placeId"));
  };

  const handleTogglePlace = ({
    checked,
    hitlistPlaceId,
  }: HandleTogglePlaceProps) => {
    setPlacesWithDetails(
      produce((draft) => {
        const place = draft.find((place) => place.id === hitlistPlaceId);
        if (place) {
          place.visited = checked ? "YES" : "NO";
        }
      })
    );
  };

  useEffect(() => {
    setFormState("places", placesWithDetails);
    console.log({ placesWithDetails, places, formData });
  }, [placesWithDetails, setFormState]);

  useEffect(() => {
    if (mode === "update" && places.length > 0) {
      setPlacesWithDetails(places);
    }
  }, [mode, places]);

  return (
    <Box>
      <div className="flex gap-4">
        <Label>Hitlist</Label>
      </div>
      <AutocompletePlace
        onSelectPrediction={(prediction) => {
          const formattedPlace = formatPredictionToHitlistPlace(prediction);
          handleAppendPlace(formattedPlace);
        }}
        inputProps={{
          className: "max-w-sm",
        }}
      />
      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {placesWithDetails.map((hitlistPlace) => (
          <HitlistPlaceItem
            key={hitlistPlace.id}
            handleTogglePlace={handleTogglePlace}
            hitlistPlace={hitlistPlace}
          />
        ))}
      </div>
    </Box>
  );
};

type HandleTogglePlaceProps = {
  checked: boolean;
  hitlistPlaceId?: string;
};
type HitlistPlaceItemProps = {
  hitlistPlace: HitlistPlaceWithDetails;
  handleTogglePlace: (props: HandleTogglePlaceProps) => void;
};
const HitlistPlaceItem = ({
  hitlistPlace,
  handleTogglePlace,
}: HitlistPlaceItemProps) => {
  return (
    <div
      key={hitlistPlace.placeId}
      className="flex flex-col items-center gap-4 rounded-sm border border-sand-8 bg-sand-3 px-4 py-2"
    >
      <div className="flex w-full flex-col justify-start">
        <Text className="font-bold">{hitlistPlace?.place?.name}</Text>
        <Text className="text-sm">{hitlistPlace?.place?.formattedAddress}</Text>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Visited?</Label>
          <Checkbox.Controlled
            size="lg"
            checked={hitlistPlace.visited === "YES"}
            onChange={(checked) => {
              handleTogglePlace({ checked, hitlistPlaceId: hitlistPlace.id });
            }}
          />
        </div>
        <Button>Leave Review</Button>
      </div>
    </div>
  );
};

function pushIfNew<T>(array: T[], item: T, field: keyof T): T[] {
  if (!array.some((i) => i[field] === item[field])) {
    return [...array, item];
  }
  return [...array];
}

function formatPredictionToHitlistPlace(prediction: TPlacePrediction) {
  const now = new Date(Date.now());
  const newPlace = {
    placeId: prediction.place_id,
    id: `${Date.now()}`,
    createdAt: now,
    hitListId: `${Date.now()}`,
    updatedAt: now,
    visited: "NO",
    place: {
      formattedAddress: prediction.structured_formatting.main_text,
      name: prediction.structured_formatting.main_text,
    },
  } as HitlistPlaceWithDetails;

  return newPlace;
}
