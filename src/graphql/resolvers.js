export const resolvers = {
  Query: {
    contacts: async (_, args, context) => {
      return await context.prisma.Contact.findMany({
        include: {
          phone: true,
          address: true,
        },
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy,
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
    updateContact: async (_, args, context) => {
      return await context.prisma.contact.update({
        where: {
          id: Number(args.Contact.id) || undefined,
        },
        data: {
          firstName: args.Contact.firstName || undefined,
          lastName: args.Contact.lastName || undefined,
          email: args.Contact.email || undefined,
          phone: args.Contact.phone
            ? {
                update: {
                  work: args.Contact.phone.work || undefined,
                  home: args.Contact.phone.home || undefined,
                  mobile: args.Contact.phone.mobile || undefined,
                  other: args.Contact.phone.other || undefined,
                },
              }
            : undefined,
          address: args.Contact.address
            ? {
                update: {
                  street: args.Contact.address.street || undefined,
                  city: args.Contact.address.city || undefined,
                  country: args.Contact.address.country || undefined,
                  postalCode: args.Contact.address.postalCode || undefined,
                },
              }
            : undefined,
        },
        include: {
          phone: true,
          address: true,
        },
      })
    },
    deleteContact: async (_, args, context) => {
      return await context.prisma.contact.delete({
        where: {
          id: parseInt(args.id),
        },
      })
    },
  },
}
