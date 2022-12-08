import { router } from "../trpc";

import { authRouter } from "./auth";
import { placesRouter } from "./places";
import { reviewRouter } from "./reviews";

export const appRouter = router({
  auth: authRouter,
  places: placesRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
