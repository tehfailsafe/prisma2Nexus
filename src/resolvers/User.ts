export const User = {
  Query: {
    user(_: any, data: any, ctx: any) {
      console.log(ctx.photon)
    },
  },

  Mutation: {},
}
