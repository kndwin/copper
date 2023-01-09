import { Text, Button } from "~/ui";
import { HiPlus, HiOutlineMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { type ReactNode } from "react";
import { styled } from "classname-variants/react";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  icon: ReactNode;
};

const StyledIcon = styled(
  "div",
  "h-12 w-12 rounded-full bg-sand-4 p-2 flex items-center justify-center"
);

export const EmptyState = (props: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-sand-6 p-8 text-center">
      <StyledIcon>{props.icon}</StyledIcon>
      <Text className="text-xl font-bold">{props.title}</Text>
      <Text>{props.description}</Text>
      <Button
        as={Link}
        href={props.ctaHref}
        variant="outline"
        className="w-fit"
        size="lg"
      >
        <HiPlus />
        {props.ctaLabel}
      </Button>
    </div>
  );
};
