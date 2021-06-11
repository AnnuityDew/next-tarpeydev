import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
    // ...add more providers here
  ],
  session: { jwt: true },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
})

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: "Credentials",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "username" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // You need to provide your own logic here that takes the credentials
//         // submitted and returns either a object representing a user or value
//         // that is false/null if the credentials are invalid.
//         // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//         // You can also use the `req` object to obtain additional parameters
//         // (i.e., the request IP address)
//         let api
//         if (process.env.API_ENV === "test") {
//           api = "http://127.0.0.1:8000"
//         } else if (process.env.API_ENV === "dev") {
//           api = "https://dev.tarpey.dev"
//         } else {
//           api = "https://api.tarpey.dev"
//         }
//         const res = await fetch(`${api}/users/token`, {
//           method: "POST",
//           body: `username=${credentials.username}&password=${credentials.password}`,
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             accept: "application/json",
//           },
//         })
//         const user = await res.json()
//         console.log(user)

//         // If no error and we have user data, return it
//         if (res.ok && user) {
//           return user
//         }
//         // Return null if user data could not be retrieved
//         return null
//       },
//     }),
//   ],
//   callbacks: {
//     /**
//      * @param  {object}  token     Decrypted JSON Web Token
//      * @param  {object}  user      User object      (only available on sign in)
//      * @param  {object}  account   Provider account (only available on sign in)
//      * @param  {object}  profile   Provider profile (only available on sign in)
//      * @param  {boolean} isNewUser True if new user (only available on sign in)
//      * @return {object}            JSON Web Token that will be saved
//      */
//     async jwt(token, user) {
//       if (user) {
//         token.access_token = user.access_token
//         token.token_type = user.token_type
//       }

//       return token
//     },

//     async session(session, token) {
//       session.access_token = token.access_token
//       return session
//     },
//   },
// })

