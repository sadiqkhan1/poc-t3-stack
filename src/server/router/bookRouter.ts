import { createRouter } from "./context";
import { z } from "zod";

export const bookRouter = createRouter()
  .query("getAllBooks", {
    resolve: async ({ ctx }) => ctx.prisma.book.findMany(),
  })
  .query("getBorrowData", {
    resolve: async ({ ctx }) =>
      ctx.prisma.borrowed.findMany({ include: { book: true, borrower: true } }),
  })
  .mutation("addBook", {
    input: z.object({
      name: z.string(),
      author: z.string(),
      quantity: z.number(),
      maxBorrowDuration: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const { name, author, quantity, maxBorrowDuration } = input;
      const book = await ctx.prisma.book.create({
        data: {
          name,
          author,
          quantity,
          maxBorrowDuration,
        },
      });
      return book;
    },
  })
  .mutation("lendBook", {
    input: z.object({
      borrowedFrom: z.date(),
      borrowedTill: z.date(),
      bookId: z.string(),
      borrowerId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { borrowedFrom, borrowedTill, bookId, borrowerId } = input;
      const book = await ctx.prisma.borrowed.create({
        data: {
          borrowedFrom,
          borrowedTill,
          bookId,
          borrowerId,
        },
      });
      return book;
    },
  })
  .mutation("updateBorrowQuantity", {
    input: z.object({
      id: z.string(),
      borrowedQuantity: z.number(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, borrowedQuantity } = input;
      const item = await ctx.prisma.book.update({
        where: {
          id,
        },
        data: {
          borrowedQuantity,
        },
      });
      return item;
    },
  });

//   .mutation('deleteItem', {
//     input: z.object({
//       id: z.string(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       const { id } = input
//       const item = await ctx.prisma.shoppingItem.delete({
//         where: {
//           id,
//         },
//       })
//       return item
//     },
//   })
