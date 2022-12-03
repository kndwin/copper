import { Button, Input } from "~/ui";

export const InputSearch = () => {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Search location" />
      <Button>Search</Button>
    </div>
  );
};
