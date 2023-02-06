Melodius is an app built to make finding new music easier. It leverages API calls to Spotify and Open AI in order to provide dynamic music suggestions based on both simple and complex requests. The data is then returned to the user in a user friendly way. The user can listen to songs and add them to their Spotify playlists. The app also servers as a spotify controller with play pause and volume functionality. 

Technologies Used: React, Next.js, Next.Auth, Next.Middleware, Tailwind.CSS, Recoil.js, 

Install Instructions:

1. Clone the Repo
2. Set up a Next.js project with Tailwind CSS :

# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.2)](https://tailwindcss.com/blog/tailwindcss-v3-2) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

```bash
pnpm create next-app --example with-tailwindcss with-tailwindcss-app
```
3. Install dependencies needed with ```npm install ```

4. You will then need to visits Spotify for Developers and create an account and grab your unique access tokens.
5. Repeat step 4 for OpenAI API.

6. You should be ready to go! 


FUTURE FEATURES:

//--There currently seems to be an issue with the Spotify API which is not allowing the following actions. I am hoping this is resolved soon and the app can be updated with the following:
1. Playlist delete functionality.
2. Song skip, song rewind, and continuos play. 

//-Other future features:

1. Embedded music player inside the app so that the user does not have to have spotify open to play songs. 
2. Ability to better navigate playlists for easy edits.
3. Liking songs to add to user Library
4. Album art view modal.
5. Bug fixes. 

I'd be happy to hear any suggestions or features that people would want, please dont hesistate to reach out. 
