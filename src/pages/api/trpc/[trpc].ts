import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "~/env/server.mjs";
import { createContext } from "~/server/trpc/context";
import { appRouter } from "~/server/trpc/router/_app";

const REVALIDATE_IN_SECONDS = 60 * 60 * 24;
// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the keyword `public` in them
    const allPublic = paths && paths.every((path) => path.includes("public"));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";
    if (ctx?.res && allPublic && allOk && isQuery) {
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${REVALIDATE_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
