import { z } from "zod";

import { router, publicProcedure } from "../trpc";

const cafes = [
  {
    id: 1,
    name: "YELLOW DAY COFFEE ROSTERS",
    location: "abc",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipO9WNIEQnaPxLER0gm4x4yMEdkNooZto3mn3TEN=s1360-w1360-h1020",
  },
  {
    id: 2,
    name: "YELLOW DAY COFFEE ROSTERS",
    location: "abc",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipO9WNIEQnaPxLER0gm4x4yMEdkNooZto3mn3TEN=s1360-w1360-h1020",
  },
  {
    id: 3,
    name: "YELLOW DAY COFFEE ROSTERS",
    location: "abc",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipO9WNIEQnaPxLER0gm4x4yMEdkNooZto3mn3TEN=s1360-w1360-h1020",
  },
  {
    id: 4,
    name: "YELLOW DAY COFFEE ROSTERS",
    location: "abc",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipO9WNIEQnaPxLER0gm4x4yMEdkNooZto3mn3TEN=s1360-w1360-h1020",
  },
];

export const cafeRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return cafes;
  }),
});
