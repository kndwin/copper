import { router } from "../trpc";

import { authRouter } from "./auth";
import { cafeRouter } from "./cafes";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  cafes: cafeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
