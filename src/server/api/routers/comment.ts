import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const commentRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ text: z.string().min(1), postId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.comment.create({
      data: {
        text: input.text,
        createdBy: { connect: { id: ctx.session.user.id } },
        post: { connect: { id: input.postId } }
      }
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.comment.findMany({
      include: {
        createdBy: true
      }
    });
  })
});
