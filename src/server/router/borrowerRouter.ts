import { createRouter } from "./context";
import { z } from "zod";

export const borrowerRouter = createRouter()
  .query("getAllBorrower", {
    resolve: async ({ ctx }) => ctx.prisma.borrower.findMany(),
  })
  .mutation("addBorrower", {
    input: z.object({
      name: z.string(),
      email: z.string(),
      contactNumber: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const { name, email, contactNumber } = input;

      const borrower = await ctx.prisma.borrower.create({
        data: {
          name,
          email,
          contactNumber,
        },
      });

      return borrower;
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

//   .mutation('toggleChecked', {
//     input: z.object({
//       id: z.string(),
//       checked: z.boolean(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       const { id, checked } = input

//       const item = await ctx.prisma.shoppingItem.update({
//         where: {
//           id,
//         },
//         data: {
//           checked,
//         },
//       })

//       return item
//     },
//   })
