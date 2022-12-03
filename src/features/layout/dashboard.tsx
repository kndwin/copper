import Head from "next/head";
import { HiOutlineMenuAlt2, HiCog } from "react-icons/hi";
import { type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "~/ui";
import { Logo, IconToggleDarkMode, PopoverProfile } from "~/features/layout";

export const DashboardLayout = (page: ReactNode) => {
  return (
    <>
      <Head>
        <title>copper</title>
        <meta name="description" content="cafe hopper, copper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Header>
          <Logo />
          <div className="flex items-center gap-2">
            <IconToggleDarkMode />
            <PopoverProfile />
          </div>
        </Header>
        <div className="flex h-full flex-1">
          <AsideNavbar />
          <main className="w-full py-4 pl-12 pr-4">{page}</main>
        </div>
      </Page>
    </>
  );
};

export const Page = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen w-full bg-sand-2">
    <div className="mx-auto flex h-full w-full max-w-[60em] flex-1 flex-col px-4">
      {children}
    </div>
  </div>
);

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="flex items-center justify-between gap-2 border-b border-sand-6 p-4">
      {children}
    </header>
  );
};

export const getDashboardLayout = DashboardLayout;

const navOptions = [
  {
    label: "Reviews",
    icon: <HiOutlineMenuAlt2 />,
    href: "/dashboard",
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
      {navOptions.map((option) => (
        <Button
          key={option.href}
          as={Link}
          href={option.href}
          size="lg"
          className={
            router.pathname !== option.href ? "bg-transparent" : "bg-sand-5"
          }
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </aside>
  );
};
