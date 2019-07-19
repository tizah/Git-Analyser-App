import auth0 from "auth0-js";
import * as constants from "../constants";

const REDIRECT_ON_LOGIN = "redirect_on_login";
export default class Auth {
  history: any;
  userProfile: any;
  requestedScopes: any;
  auth0: auth0.WebAuth;

  constructor(history: any) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email";
    this.auth0 = new auth0.WebAuth({
      domain: constants.REACT_APP_AUTH0_DOMAIN,
      clientID: constants.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token",
      scope: this.requestedScopes
    });

    console.log(this.auth0.client);
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
            ? "/"
            : "/Profile";
        //JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for details`);
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = (authResult: any) => {
    //set the time that the access token will expire
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    const scopes = authResult.scope || this.requestedScopes || "";
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };

  // isAuthenticated() {
  //  const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  //   return new Date().getTime() < expiresAt;
  // }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scope");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000/"
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No Access token found");
    }
    return accessToken;
  };

  getProfile = (cb: any) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      cb(profile, err);
    });
  };

  //   userHasScopes(scopes : any) {
  //     const grantedScopes = (
  //       JSON.parse(localStorage.getItem("scopes")) || ""
  //     ).split(" ");
  //     return scopes.every(scope => grantedScopes.includes(scope));
  //   }
}
