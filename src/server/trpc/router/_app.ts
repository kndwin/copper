import { router } from "../trpc";

import { authRouter } from "./auth";
import { placesRouter } from "./places";
import { reviewRouter } from "./reviews";
import { hitlistRouter } from "./hitlist";

export const appRouter = router({
  auth: authRouter,
  places: placesRouter,
  review: reviewRouter,
  hitlist: hitlistRouter,
});

export type AppRouter = typeof appRouter;
