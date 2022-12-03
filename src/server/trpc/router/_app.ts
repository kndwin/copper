import { router } from "../trpc";

import { authRouter } from "./auth";
import { cafeRouter } from "./cafes";
import { exampleRouter } from "./example";
import { placesRouter } from "./places";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  cafes: cafeRouter,
  places: placesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
