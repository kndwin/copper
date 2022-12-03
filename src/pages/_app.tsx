import { type AppProps } from "next/app";
import { type ReactNode, type ReactElement } from "react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import "tailwind.css";
import { trpc } from "~/utils/trpc";

type TCustomAppProps = AppProps & {
  Component: { getLayout: (page: ReactNode) => ReactNode };
  pageProps: {
    session: Session | null;
  };
};

const CustomApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: TCustomAppProps) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(CustomApp);
