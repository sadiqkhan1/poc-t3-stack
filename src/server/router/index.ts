// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { bookRouter } from "./bookRouter";
import { borrowerRouter } from "./borrowerRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("book.", bookRouter)
  .merge("borrower.", borrowerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
