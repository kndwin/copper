import { type NextPage } from "next";
import Head from "next/head";

import { MenuFilter, GridCafes, InputSearch } from "~/features/search";
import { IconToggleDarkMode, Logo, SignInButton } from "~/features/layout";
import { Page } from "~/features/layout";

const HomePage: NextPage = () => {
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
          <div className="mx-auto flex w-fit items-center gap-4">
            <MenuFilter />
            <InputSearch />
          </div>
          <div className="flex items-center gap-4 ">
            <IconToggleDarkMode />
            <SignInButton />
          </div>
        </Page.Header>

        <Page.Main>
          <GridCafes />
        </Page.Main>
      </Page>
    </>
  );
};

export default HomePage;
