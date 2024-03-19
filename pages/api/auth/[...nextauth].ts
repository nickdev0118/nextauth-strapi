// import NextAuth from "next-auth";
//     import Google from "next-auth/providers/google";
    
//     const options = {
//       providers: [
//         Google({
//           clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//         }),
//       ],
//       database: process.env.NEXT_PUBLIC_DATABASE_URL,
//     //   session: {
//     //     jwt: true,
//     //   },
//       callbacks: {
//         // session: async (session: any, user: any) => {
//         //   session.jwt = user.jwt;
//         //   session.id = user.id;
//         //   return Promise.resolve(session);
//         // },
//         // jwt: async (token: any, user: any, account: any) => {
//         //   const isSignIn = user ? true : false;
//         //   if (isSignIn) {
//         //     const response = await fetch(
//         //       `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
//         //     );
//         //     const data = await response.json();
//         //     token.jwt = data.jwt;
//         //     token.id = data.user.id;
//         //   }
//         //   return Promise.resolve(token);
//         // },
//       },
//     };
    
//     const Auth = () =>
//       NextAuth(options);
    
//     export default Auth;

import { randomBytes, randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

console.log(process.env.GOOGLE_CLIENT_ID);

const options = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  // Add other options as needed
//   session: {
    
//   },
// session: {
//     // Choose how you want to save the user session.
//     // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
//     // If you use an `adapter` however, we default it to `"database"` instead.
//     // You can still force a JWT session by explicitly defining `"jwt"`.
//     // When using `"database"`, the session cookie will only contain a `sessionToken` value,
//     // which is used to look up the session in the database.
//     strategy: "database",
  
//     // Seconds - How long until an idle session expires and is no longer valid.
//     maxAge: 30 * 24 * 60 * 60, // 30 days
  
//     // Seconds - Throttle how frequently to write to database to extend a session.
//     // Use it to limit write operations. Set to 0 to always update the database.
//     // Note: This option is ignored if using JSON Web Tokens
//     updateAge: 24 * 60 * 60, // 24 hours
    
//     // The session token is usually either a random UUID or string, however if you
//     // need a more customized session token string, you can define your own generate function.
//     generateSessionToken: () => {
//       return randomUUID?.() ?? randomBytes(32).toString("hex")
//     }
//   },
//   jwt: {
//     // The maximum age of the NextAuth.js issued JWT in seconds.
//     // Defaults to `session.maxAge`.
//     maxAge: 60 * 60 * 24 * 30,
//     // You can define your own encode/decode functions for signing and encryption
//     async encode() {},
//     async decode() {},
//   },
 callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log(user)
    console.log(account)
    console.log(profile)
    console.log(email)
    return true
  },
  async redirect({ url, baseUrl }) {
    console.log('--------------------------------------------------------');
    console.log(url)
    console.log(baseUrl)
    return baseUrl
  },
  async session({ session, token, user }) {
    console.log('********************************************************');
    console.log(user)
    console.log(token)
    console.log(session)
    session.jwt = user.jwt;
    session.id = user.id;
    session.accessToken = token.accessToken
    return session
  },
  async jwt({ token, account }) {
    console.log('///////////////////////////////////////////////////////');
    console.log(token)
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  }
}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth(options);