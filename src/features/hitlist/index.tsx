import { Text } from "~/ui";
import { Page } from "../layout";
import { BackButton } from "~/features/common/Header";

export const HitlistContent = () => {
  return (
    <div>
      <Text>Hello</Text>
    </div>
  );
};

export const HitlistHeader = () => {
  return (
    <Page.Header>
      <div>
        <BackButton />
      </div>
    </Page.Header>
  );
};
