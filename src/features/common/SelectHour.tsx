import { HiOutlineChevronDown } from "react-icons/hi2";
import { Select } from "~/ui";

type T24Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;
type TSelectHoursProps = {
  placeholder: string;
  defaultHour?: T24Hour;
};

export const SelectHours = (props: TSelectHoursProps) => {
  return (
    <Select defaultValue={`${props.defaultHour}`}>
      <Select.Trigger size="lg">
        <Select.Value placeholder={props.placeholder} />
        <Select.Icon>
          <HiOutlineChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="0">12:00 AM</Select.Item>
        <Select.Item value="1">1:00 AM</Select.Item>
        <Select.Item value="2">2:00 AM</Select.Item>
        <Select.Item value="3">3:00 AM</Select.Item>
        <Select.Item value="4">4:00 AM</Select.Item>
        <Select.Item value="5">5:00 AM</Select.Item>
        <Select.Item value="6">6:00 AM</Select.Item>
        <Select.Item value="7">7:00 AM</Select.Item>
        <Select.Item value="8">8:00 AM</Select.Item>
        <Select.Item value="9">9:00 AM</Select.Item>
        <Select.Item value="10">10:00 AM</Select.Item>
        <Select.Item value="11">11:00 AM</Select.Item>
        <Select.Item value="12">12:00 PM</Select.Item>
        <Select.Item value="13">1:00 PM</Select.Item>
        <Select.Item value="14">2:00 PM</Select.Item>
        <Select.Item value="15">3:00 PM</Select.Item>
        <Select.Item value="16">4:00 PM</Select.Item>
        <Select.Item value="17">5:00 PM</Select.Item>
        <Select.Item value="18">6:00 PM</Select.Item>
        <Select.Item value="19">7:00 PM</Select.Item>
        <Select.Item value="20">8:00 PM</Select.Item>
        <Select.Item value="21">9:00 PM</Select.Item>
        <Select.Item value="22">10:00 PM</Select.Item>
        <Select.Item value="23">11:00 PM</Select.Item>
      </Select.Content>
    </Select>
  );
};
