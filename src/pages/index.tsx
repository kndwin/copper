import { type NextPage } from "next";
import Head from "next/head";

import { MenuFilter, GridCafes, InputSearch } from "~/features/search";
import { IconToggleDarkMode, Logo, SignInButton } from "~/features/layout";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>copper</title>
        <meta name="description" content="cafe hopper, copper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-full bg-sand-2 text-sage-12">
        <div className="mx-auto max-w-[60em] px-2">
          <header className="flex items-center justify-between gap-2 border-b border-sand-6 p-4">
            <Logo />
            <div className="mx-auto flex w-fit items-center gap-4">
              <MenuFilter />
              <InputSearch />
            </div>
            <div className="flex items-center gap-4 ">
              <IconToggleDarkMode />
              <SignInButton />
            </div>
          </header>

          <main className="container mx-auto flex h-full flex-col px-8">
            <GridCafes />
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
