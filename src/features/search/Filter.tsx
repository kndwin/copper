import { styled } from "classname-variants/react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Popover, Text } from "~/ui";
import { SelectHours } from "~/features/common";

export const MenuFilter = () => {
  return (
    <Popover>
      <Popover.Trigger>
        Filters
        <MixerHorizontalIcon />
      </Popover.Trigger>
      <Popover.Content className="flex flex-col gap-2" sideOffset={8} size="xl">
        <FilterHours />
        <FilterCoffee />
        <FilterFood />
        <FilterInternet />
        <FilterPowerpoint />
      </Popover.Content>
    </Popover>
  );
};

const FilterInternet = () => {
  return (
    <SFilterContainer>
      <STitle>Internet</STitle>
      <div className="grid grid-cols-3 gap-2">
        <SOption>No</SOption>
        <SOption selected>A little</SOption>
        <SOption>A lot</SOption>
      </div>
    </SFilterContainer>
  );
};

const FilterCoffee = () => {
  return (
    <SFilterContainer>
      <STitle>Coffee</STitle>
      <div className="grid grid-cols-3 gap-2">
        <SOption>Low</SOption>
        <SOption selected>Okay</SOption>
        <SOption>Exceptional</SOption>
      </div>
    </SFilterContainer>
  );
};

const FilterPowerpoint = () => {
  return (
    <SFilterContainer>
      <STitle>Powerpoint</STitle>
      <div className="grid grid-cols-3 gap-2">
        <SOption>No</SOption>
        <SOption selected>A little</SOption>
        <SOption>A lot</SOption>
      </div>
    </SFilterContainer>
  );
};

const FilterFood = () => {
  return (
    <SFilterContainer>
      <STitle>Food</STitle>
      <div className="grid grid-cols-3 gap-2">
        <SOption selected>Poor</SOption>
        <SOption>Okay</SOption>
        <SOption>Good</SOption>
      </div>
    </SFilterContainer>
  );
};

const FilterHours = () => {
  return (
    <SFilterContainer>
      <STitle>Hours</STitle>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <Text as="label" className="text-sm font-bold">
            Opening
          </Text>
          <SelectHours defaultHour={9} placeholder="Opening hours" />
        </div>
        <div className="flex flex-col">
          <Text as="label" className="text-sm font-bold">
            Closing
          </Text>
          <SelectHours defaultHour={15} placeholder="Closing hours" />
        </div>
      </div>
    </SFilterContainer>
  );
};

const SFilterContainer = styled("div", {
  base: "flex flex-col py-2 gap-2",
  variants: {},
});

const SOption = styled("div", {
  base: "flex items-center justify-center rounded p-2 bg-sand-3 hover:bg-sand-4",
  variants: {
    selected: {
      true: "bg-sand-6",
    },
  },
});

const STitle = styled(Text, "font-bold text-xl");
