import { type NextPage } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import { GiCoffeePot, GiSun, GiMoon } from "react-icons/gi";
import { HiOutlineChevronDown, HiStar } from "react-icons/hi2";
import cx from "classnames";

import { Button, Popover, Input, Menu, Select } from "~/ui";
import { trpc } from "~/utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Copper</title>
        <meta name="description" content="Cafe hopping guide" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-full bg-sand-2 text-sage-12">
        <Header />

        <main className="container mx-auto flex h-full flex-col px-8">
          <div className="mt-12 flex w-fit flex-col gap-2">
            <h1 className="font-serif text-8xl text-sand-12 selection:bg-sand-6">
              copper
            </h1>
            <p className="mt-4 w-fit rounded bg-sand-5 px-2 py-1">
              a cafe hopping guide
            </p>
          </div>

          <div className="mx-auto mt-8 flex w-fit items-center gap-2 ">
            <MenuFilter />
            <Input placeholder="Search location" />
            <Button>Search</Button>
          </div>

          <GridCafes />
        </main>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-2 p-4">
      <div className="flex items-center gap-2 ">
        <GiCoffeePot />
        <p className="font-serif text-sand-12">copper</p>
        <p className="rounded bg-grass-5 px-1 text-sm font-bold">BETA</p>
      </div>
      <div className="flex items-center gap-2 ">
        <IconToggleDarkMode />
        <SignInButton />
      </div>
    </header>
  );
};

const MenuFilter = () => {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button>
          Filter
          <HiOutlineChevronDown />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="flex flex-col gap-1" sideOffset={8} size="xl">
        <label id="hours">Opening hours</label>
        <Select>
          <Select.Trigger asChild>
            <Button>
              Opening hours
              <HiOutlineChevronDown />
            </Button>
          </Select.Trigger>
          <Select.Content2>
            <Select.Item value="1">
              <Select.Text>1</Select.Text>
            </Select.Item>
          </Select.Content2>
        </Select>
        <input type="range" min={0} max={5} className="bg-sand-12" />
        <label>Atmosphere</label>
        <Stars stars={3} />
        <label>Coffee</label>
        <label>Food</label>
        <div className="flex flex-col">
          <label>Noise level</label>
          <div className="flex gap-2">
            <input type="radio" />
            <input type="radio" />
            <input type="radio" />
          </div>
        </div>
        <label>Internet</label>
      </Popover.Content>
    </Popover>
  );
};

type StarProps = {
  stars?: number;
};
const Stars = ({ stars = 0 }: StarProps) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <HiStar
          key={index}
          className={cx(
            index < stars && "text-yellow-8",
            "h-12 w-12 text-yellow-2"
          )}
        />
      ))}
    </div>
  );
};

const GridCafes = () => {
  const cafeQuery = trpc.cafes.getAll.useQuery();
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cafeQuery.data?.map((cafe) => (
        <div
          key={cafe.id}
          className="flex flex-col gap-4 rounded-lg border border-sand-6 bg-sand-3 p-4 hover:bg-sand-5"
        >
          <p className="text-lg text-sand-12">{cafe.name}</p>
          <img
            src={cafe.image}
            alt="Image of cafe"
            className="h-[10em] object-cover"
          />
        </div>
      ))}
    </div>
  );
};

const IconToggleDarkMode = () => {
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

const SignInButton = () => {
  return <Button>Leave a review</Button>;
};

export default Home;
