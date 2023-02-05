import spotifyApi from "../lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function useSpotify() {

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      //-----if there is an error with login this forces user to login again
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      //-----Sets spotify api access so that this function can be used throughout the app. It will refire each time the session changes.
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
