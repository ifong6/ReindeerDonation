import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// 1. creating an instance of a CognitoUserPool object using
//    the Amazon Cognito Identity SDK for JavaScript
// 2. configuration to connect to a specific Amazon Cognito user pool
const UserPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
});

// NextAuth is a config Object
const handler = NextAuth({
  // Include both 'Google' and 'Credentials' providers
  providers: [
    // ---Configure your list of authentication providers:---
    // 1) Add Cognito Provider for Google sign-in  (an OAuth provider)
    CognitoProvider({
      id: "cognito",
      name: "Cognito",
      type: "oauth",
      idToken: true,
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      client: {
        token_endpoint_auth_method: "none",
      },
      checks: ["state", "nonce"],
      issuer: process.env.COGNITO_ISSUER,
      wellKnown: `${process.env.COGNITO_ISSUER}/.well-known/openid-configuration`,
      authorization: {
        url: `${process.env.COGNITO_DOMAIN}/oauth2/authorize`,
        params: {
          response_type: "code",
          identity_provider: "Google",
          scope: "profile email openid", //"openid email profile",
          redirect_uri: "http://localhost:3000/api/auth/callback/cognito",
        },
      },
      profile(profile) {
        return {
          id: profile["cognito:username"], // provided id from cognito
          oauthId: profile.sub, // provided id from oauth
          email: profile.email,
          name: profile.name,
        };
      },
    }),

    //---------------- this provider used for manual log-in ----------------//
    //----------------------------------------------------------------------//
    // 2) add CredentialsProvider for custom log-in
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // NextAuth will call 'authorize 'when a user submits their credentials
      authorize(credentials) {
        // CognitoUser object represents the user in Amazon Cognito.
        const cognitoUser = new CognitoUser({
          Username: credentials?.email,
          Pool: UserPool,
        });

        // An object that includes the user's email and password.
        // This object will be used to authenticate the user against
        // Amazon Cognito
        const authenticationDetails = new AuthenticationDetails({
          Username: credentials?.email,
          Password: credentials?.password,
        });

        return new Promise((resolve, reject) => {
          // Starts the authentication process of the cognitoUser
          // with the provided authenticationDetails
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
              if (session instanceof CognitoUserSession) {
                const userInfo = {
                  id: session.getIdToken().payload.sub,
                  email: session.getIdToken().payload.email,
                  name: session.getIdToken().payload.name,
                  idToken: session.getIdToken().getJwtToken(),
                  accessToken: session.getAccessToken().getJwtToken(),
                  refreshToken: session.getRefreshToken().getToken(),
                };
                console.log(">>> userInfo created in onSuccess !!");
                resolve(userInfo);
              }
            },
            onFailure: (error) => {
              if (error) {
                console.log(">>> error printed:", error);
                reject(error);
              }
            },
          });
        });
      },
    }),
    //----------------------------------------------------------------------//
    //----------------------------------------------------------------------//
  ],

  // Add the callbacks configuration here
  callbacks: {
    // This callback is called after the user is authenticated and tokens are received
    async jwt({ token, account, user }) {
      // user is only available the first time a user signs in authorized
      // "user" in jwt() is a user object received from your authorize function (e.g., for CredentialsProvider)
      // it takes the tokens received during authentication and store them in the JWT token "token"
      console.log("---User signed in ---");

      if (account) {
        if (account.provider === "credentials") {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.idToken = user.idToken;
        } else if (account.provider === "cognito") {
          token.accessToken = account.access_token; //cognito's token is named differently
          token.refreshToken = account.refresh_token;
          token.idToken = account.id_token;
        }
      }

      return token;
    },

    // executed after the user is authenticated
    async session({ session, token }) {
      console.log("---Session callback to get token---");
      // Assign the custom user properties to the session object
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.idToken = token.idToken;
      }
      console.log("---Session callback to get session---");
      //console.log(">>> print session:", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
