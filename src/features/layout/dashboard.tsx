import Head from "next/head";
import { HiOutlineMenuAlt2, HiCog, HiStar } from "react-icons/hi";
import { type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "~/ui";
import { Logo, IconToggleDarkMode, PopoverProfile } from "~/features/layout";
import { match } from "ts-pattern";
import { Page } from "~/features/layout";

export const DashboardLayout = (page: ReactNode) => {
  return (
    <>
      <Head>
        <title>copper</title>
        <meta name="description" content="cafe hopper, copper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Page.Header>
          <Logo />
          <div className="flex items-center gap-2">
            <IconToggleDarkMode />
            <PopoverProfile />
          </div>
        </Page.Header>
        <div className="flex h-full flex-1">
          <AsideNavbar />
          <main className="w-full py-4 pl-12 pr-4">{page}</main>
        </div>
      </Page>
    </>
  );
};

export const getDashboardLayout = DashboardLayout;

type NavOption = {
  label: string;
  icon: ReactNode;
  href: string;
  hide?: boolean;
};

const navOptions: NavOption[] = [
  {
    label: "Hit List",
    icon: <HiStar />,
    href: "/dashboard/hitlist",
  },
  {
    label: "Reviews",
    icon: <HiOutlineMenuAlt2 />,
    href: "/dashboard/review",
  },
  {
    label: "Settings",
    icon: <HiCog />,
    href: "/dashboard/settings",
  },
];

const AsideNavbar = () => {
  const router = useRouter();

  return (
    <aside className="flex w-60 flex-col gap-2 py-4">
      {navOptions.map((option) => {
        const selected = router.pathname == option.href;
        const className = match({ selected, hidden: Boolean(option?.hide) })
          .with(
            { hidden: true },
            () =>
              "text-sand-8 bg-transparent cursor-default hover:bg-transparent"
          )
          .with({ selected: true, hidden: false }, () => "bg-sand-5")
          .with({ selected: false }, () => "bg-transparent")
          .otherwise(() => "");

        return (
          <Button
            key={option.href}
            as={Link}
            href={option.hide ? "#" : option.href}
            size="lg"
            disabled={option.hide}
            className={className}
          >
            {option.icon}
            {option.label}
          </Button>
        );
      })}
    </aside>
  );
};
