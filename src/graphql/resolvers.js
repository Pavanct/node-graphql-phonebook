export const resolvers = {
  Query: {
    contacts: async (_, args, context) => {
      return await context.prisma.Contact.findMany({
        include: {
          phone: true,
          address: true,
        },
      })
    },
    contact: async (_, args, context) => {
      return await context.prisma.Contact.findUnique({
        where: { id: Number(args.id) },
        include: {
          phone: true,
          address: true,
        },
      })
    },
  },
  Mutation: {
    createContact: async (_, args, context) => {
      return await prisma.contact.create({
        data: {
          firstName: args.Contact.firstName ? args.Contact.firstName : "",
          lastName: args.Contact.lastName ? args.Contact.lastName : "",
          email: args.Contact.email ? args.Contact.email : "",
          phone: {
            create: {
              work: args.Contact.phone.work ? args.Contact.phone.work : "",
              mobile: args.Contact.phone.mobile
                ? args.Contact.phone.mobile
                : "",
              home: args.Contact.phone.home ? args.Contact.phone.home : "",
              other: args.Contact.phone.other ? args.Contact.phone.other : "",
            },
          },
          address: {
            create: {
              street: args.Contact.address.street
                ? args.Contact.address.street
                : "",
              city: args.Contact.address.city ? args.Contact.address.city : "",
              country: args.Contact.address.country
                ? args.Contact.address.country
                : "",
              postalCode: args.Contact.address.postalCode
                ? args.Contact.address.postalCode
                : "",
            },
          },
        },
        include: {
          phone: true,
          address: true,
        },
      })
    },
  },
}