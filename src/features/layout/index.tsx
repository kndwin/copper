import { useTheme } from "next-themes";
import { GiCoffeePot, GiSun, GiMoon } from "react-icons/gi";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Popover, Text, Avatar } from "~/ui";
import { getInitials } from "./utils";

export const IconToggleDarkMode = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div
      className="cursor-pointer text-sand-12"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <GiMoon /> : <GiSun />}
    </div>
  );
};

type LogoProps = {
  withText?: boolean;
};
export const Logo = ({ withText = true }: LogoProps) => (
  <div className="flex items-center gap-3 ">
    <GiCoffeePot className="h-6 w-6" />
    {withText && <Text className="font-serif text-lg font-bold">copper</Text>}
  </div>
);

export const PopoverProfile = () => {
  const { data } = useSession();
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Avatar>
          <Avatar.Image src={data?.user?.image as string} />
          <Avatar.Fallback>{getInitials(data?.user?.name)}</Avatar.Fallback>
        </Avatar>
      </Popover.Trigger>
      <Popover.Content className="flex flex-col gap-1" sideOffset={8} size="xs">
        <SignOutButton />
      </Popover.Content>
    </Popover>
  );
};

export const SignInButton = () => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
    >
      Leave a review
    </Button>
  );
};

export const SignOutButton = () => {
  return <Button onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>;
};

export * from "./dashboard";
