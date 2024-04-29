import { publicProcedure } from "../trpc";

export const me = publicProcedure.query(({ ctx }) => ctx.session?.user ?? null);
