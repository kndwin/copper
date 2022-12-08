import "tailwind.css";
import { type AppProps } from "next/app";
import { type ReactNode } from "react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { trpc } from "~/utils/trpc";
import { Toast, AlertDialog } from "~/ui";

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
        <Toast.Provider>
          {getLayout(<Component {...pageProps} />)}
          <AlertDialog.Messages />
          <Toast.Messages />
        </Toast.Provider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(CustomApp);
