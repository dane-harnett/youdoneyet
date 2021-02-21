import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [];

if (process.env.AUTH0_CREDENTIALS === "ENABLED") {
  providers.push([
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ]);
}

if (process.env.CYPRESS_CREDENTIALS === "ENABLED") {
  providers.push(
    Providers.Credentials({
      id: "cypress-tests",
      name: "cypress-tests",
      authorize: async (credentials) => {
        const user = {
          email: "e2e-testing@youdoneyet.com",
        };
        return Promise.resolve(user);
      },
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
    })
  );
}
const options = {
  providers,
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req, res) => NextAuth(req, res, options);
