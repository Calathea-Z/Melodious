import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: pr ocess.env.GITHUB_SECRET,
      authorization: '',
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)