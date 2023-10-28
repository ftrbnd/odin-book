import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const likeRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ postId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.like.create({
      data: {
        likedBy: { connect: { id: ctx.session.user.id } },
        post: { connect: { id: input.postId } }
      }
    });
  }),
  remove: protectedProcedure.input(z.object({ likeId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.like.delete({
      where: {
        id: input.likeId
      }
    });
  })
});
