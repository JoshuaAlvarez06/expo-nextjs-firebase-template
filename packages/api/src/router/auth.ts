import { me } from "../controllers/auth";
import { createTRPCRouter } from "../trpc";

export const authRouter = createTRPCRouter({
  me,
});
