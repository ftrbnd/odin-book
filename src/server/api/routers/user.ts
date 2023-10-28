import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: {
        id: input
      },
      include: {
        posts: {
          include: {
            createdBy: true,
            comments: {
              include: {
                createdBy: true
              }
            },
            likes: true
          }
        },
        followedBy: true,
        following: true
      }
    });
  })
});
