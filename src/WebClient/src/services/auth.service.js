import * as Msal from "msal";
import Configuration from "../configuration";

class AuthService {
  constructor() {
    if (!Configuration.authSettings.redirectUri) {
      Configuration.authSettings.redirectUri = window.location.origin;
    }

    if (!Configuration.authSettings.postLogoutRedirectUri) {
      Configuration.authSettings.postLogoutRedirectUri = window.location.origin;
    }

    // Instantiate MSAL client
    this.msalApp = new Msal.UserAgentApplication({
      auth: {
        clientId: Configuration.authSettings.clientId,
        authority: Configuration.authSettings.authority,
        redirectUri: Configuration.authSettings.redirectUri,
        postLogoutRedirectUri: Configuration.authSettings.postLogoutRedirectUri,
        validateAuthority: false // False for B2C
      },
      cache: {
        cacheLocation: "localStorage"
      }
    });

    this.msalApp.handleRedirectCallback((error, response) => {
      if (response) {
        // TODO
      } else if (error) {
        // TODO
      }
    });
  }

  // Get current logged in account
  getUser() {
    return this.msalApp.getAccount();
  }

  // Find friendly display name for a user
  getUserName(user) {
    if (user) {
      if (user.userName) {
        return user.userName;
      } else if (user.name) {
        return user.name;
      } else if (user.idToken && user.idToken.given_name) {
        return user.idToken.given_name;
      } else if (
        user.idToken &&
        user.idToken.emails &&
        user.idToken.emails.length > 0
      ) {
        return user.idToken.emails[0];
      } else {
        return user.idToken.sub;
      }
    } else {
      return null;
    }
  }

  // Login user via AAD B2C
  async loginAsync(popup) {
    const loginRequest = {
      scopes: ["openid", "offline_access", "profile"]
      // Scopes can be specified to 'pre-approve' scopes that may be needed for future access tokens
      // scopes: [ "https://graph.microsoft.com/User.ReadWrite" ]
    };

    if (popup) {
      await this.msalApp.loginPopup(loginRequest);
      this.msalApp.getAccount();
    } else {
      this.msalApp.loginRedirect(loginRequest);
    }
  }

  // Logout user
  logout() {
    this.msalApp.logout();
  }

  async getIdTokenAsync(popup) {
    const tokenRequest = {
      // Pass client id as scope to get an ID token
      scopes: [Configuration.authSettings.clientId]
    };

    try {
      var tokenResponse = await this.msalApp.acquireTokenSilent(tokenRequest);
      return tokenResponse.idToken.rawIdToken;
    } catch (error) {
      if (error.name === "InteractionRequiredAuthError") {
        if (popup) {
          tokenResponse = await this.msalApp.acquireTokenPopup(tokenRequest);
          return tokenResponse.idToken.rawIdToken;
        } else {
          this.msalApp.acquireTokenRedirect(tokenRequest);
        }
      } else if (error.name === "ClientAuthError") {
        this.loginAsync();
      }
    }
  }

  async getAccessTokenAsync(scopes, popup) {
    if (!scopes && Configuration.authSettings.appIdUri) {
      scopes = [`${Configuration.authSettings.appIdUri}/user_impersonation`];
    }
    const tokenRequest = {
      scopes
    };

    try {
      var tokenResponse = await this.msalApp.acquireTokenSilent(tokenRequest);
      return tokenResponse.accessToken;
    } catch (error) {
      if (error.name === "InteractionRequiredAuthError") {
        if (popup) {
          tokenResponse = await this.msalApp.acquireTokenPopup(tokenRequest);
          return tokenResponse.accessToken;
        } else {
          this.msalApp.acquireTokenRedirect(tokenRequest);
        }
      } else if (error.name === "ClientAuthError") {
        this.loginAsync();
      }
    }
  }
}

// Export singleton instance of the auth service
export default new AuthService();
