import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async (sessionPayload, jwtPayload) => {
      return Promise.resolve({
        ...sessionPayload,
        user: {
          ...sessionPayload.user,
          id: jwtPayload.sub,
        },
      });
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
