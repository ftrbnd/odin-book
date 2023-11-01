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
  }),
  getSuggested: protectedProcedure.query(async ({ ctx }) => {
    const postsCount = await ctx.db.post.count();
    const skip = Math.floor(Math.random() * postsCount);

    return ctx.db.post.findMany({
      take: 5,
      skip: skip,
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
  }),
  getFriendPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      where: {
        OR: [
          {
            createdBy: {
              followedBy: {
                some: {
                  id: ctx.session.user.id
                }
              },
              following: {
                some: {
                  id: ctx.session.user.id
                }
              }
            }
          },
          {
            createdById: ctx.session.user.id
          }
        ]
      },
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
  }),
  toggleLike: protectedProcedure.input(z.object({ postId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    const post = await ctx.db.post.findUnique({
      where: {
        id: input.postId
      },
      include: {
        likes: true
      }
    });

    const likeExists = post?.likes.find((postLike) => postLike.likedById === ctx.session.user.id);

    if (likeExists) {
      return ctx.db.post.update({
        where: {
          id: input.postId
        },
        data: {
          likes: {
            delete: {
              id: likeExists.id
            }
          }
        }
      });
    } else {
      return ctx.db.post.update({
        where: {
          id: input.postId
        },
        data: {
          likes: {
            create: {
              likedBy: { connect: { id: ctx.session.user.id } }
            }
          }
        }
      });
    }
  })
});
