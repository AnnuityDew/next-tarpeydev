import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        let api
        if (process.env.API_ENV === "test") {
          api = "http://127.0.0.1:8000"
        } else if (process.env.API_ENV === "dev") {
          api = "https://dev.tarpey.dev"
        } else {
          api = "https://api.tarpey.dev"
        }
        const res = await fetch(`${api}/users/token`, {
          method: "POST",
          body: `username=${credentials.username}&password=${credentials.password}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        })
        const user = await res.json()
        console.log(user)

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  session: { jwt: true },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  
    // You can also specify a public key for verification if using public/private key (but private only is fine)
    // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,
  
    // If you want to use some key format other than HS512 you can specify custom options to use
    // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
    // verificationOptions = {
    //   maxTokenAge: `${maxAge}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
    //   algorithms: ['HS512']
    // },
  },
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user) {
      if (user) {
        token.access_token = user.access_token
        token.token_type = user.token_type
      }

      return token
    },

    async session(session, token) {
      session.access_token = token.access_token
      return session
    },
  },
})
