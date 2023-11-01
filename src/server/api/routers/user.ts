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
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        followedBy: true,
        following: true
      }
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
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
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        followedBy: true,
        following: true
      }
    });
  }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      },
      include: {
        followedBy: true,
        following: true
      }
    });
  }),
  toggleFriend: protectedProcedure.input(z.object({ userId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        followedBy: true,
        following: true
      }
    });

    const me = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id
      },
      include: {
        followedBy: true,
        following: true
      }
    });

    const friendsWithUser = user?.followedBy.find((follower) => follower.id === ctx.session.user.id) && me?.followedBy.find((follower) => follower.id === user.id);

    if (friendsWithUser) {
      // Remove friend
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          followedBy: {
            disconnect: { id: input.userId }
          },
          following: {
            disconnect: { id: input.userId }
          }
        }
      });

      return ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          followedBy: {
            disconnect: { id: ctx.session.user.id }
          },
          following: {
            disconnect: { id: ctx.session.user.id }
          }
        }
      });
    } else {
      // Send friend request
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          following: {
            connect: { id: input.userId }
          }
        }
      });

      return ctx.db.user.update({
        where: {
          id: input.userId
        },
        data: {
          followedBy: {
            connect: { id: ctx.session.user.id }
          }
        }
      });
    }
  }),
  acceptRequest: protectedProcedure.input(z.object({ userId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    await ctx.db.user.update({
      where: {
        id: input.userId
      },
      data: {
        followedBy: { connect: { id: ctx.session.user.id } }
      }
    });

    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id
      },
      data: {
        following: { connect: { id: input.userId } }
      }
    });
  }),
  rejectRequest: protectedProcedure.input(z.object({ userId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    return ctx.db.user.update({
      where: {
        id: input.userId
      },
      data: {
        following: { disconnect: { id: ctx.session.user.id } }
      }
    });
  }),
  cancelOutgoingRequest: protectedProcedure.input(z.object({ userId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    await ctx.db.user.update({
      where: {
        id: ctx.session.user.id
      },
      data: {
        following: {
          disconnect: { id: input.userId }
        }
      }
    });

    return ctx.db.user.update({
      where: {
        id: input.userId
      },
      data: {
        followedBy: { disconnect: { id: ctx.session.user.id } }
      }
    });
  })
});
