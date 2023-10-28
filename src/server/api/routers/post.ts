import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const postRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ text: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.post.create({
      data: {
        text: input.text,
        createdBy: { connect: { id: ctx.session.user.id } }
      }
    });
  }),
  getById: protectedProcedure.input(z.object({ postId: z.string().min(1) })).query(({ ctx, input }) => {
    return ctx.db.post.findUnique({
      where: {
        id: input.postId
      }
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      include: {
        createdBy: true,
        comments: {
          include: {
            createdBy: true
          }
        },
        likes: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  })
});
