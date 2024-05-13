import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import axios from "axios";

export default async function signOutProvider(req, res) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);

    if (session?.idToken) {
      try {
        // destroy user's session on the provider
        await axios.get(
          `${process.env.COGNITO_ISSUER}/protocol/openid-connect/logout`,
          {
            params: {
              id_token_hint: session.idToken,
            },
          }
        );

        // Optionally log the response for debugging
        console.log("Logout response:", response.data);

        res.status(200).json({ message: "Logout successful" });
      } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: "Failed to log out" });
      }
    } else {
      // If user is not signed in, respond with 200 OK
      res.status(200).json({ message: "No session found" });
    }
  }
}
