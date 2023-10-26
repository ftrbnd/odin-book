import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {

      return ctx.db.post.create({
        data: {
          title: input.title,
          text: input.text,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
