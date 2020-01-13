import axios from "axios";
import AuthService from "./auth.service";

export default class WebApiService {
  constructor(hostUrl) {
    this.hostUrl = hostUrl;
  }

  async anonymousApi() {
    var endpoint = `${this.hostUrl}/HelloWorld`;
    var response = await axios.get(endpoint);
    try {
      if (response && this.isSuccessStatusCode(response.status)) {
        return response.data;
      } else {
        console.error(
          `Error response from ${endpoint}: ${response.status} ${
            response.statusText
          } ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.error(`Error calling ${endpoint}: ${error.message}`);
    }

    return null;
  }

  async authorizedApi() {
    var config = {
      headers: {
        authorization: `Bearer ${await AuthService.getAccessTokenAsync()}`
      }
    };

    var endpoint = `${this.hostUrl}/HelloWorld/Secure`;
    var response = await axios.get(endpoint, config);
    try {
      if (response && this.isSuccessStatusCode(response.status)) {
        return response.data;
      } else {
        console.error(
          `Error response from ${endpoint}: ${response.status} ${
            response.statusText
          } ${JSON.stringify(response.data)}`
        );
      }
    } catch (error) {
      console.error(`Error calling ${endpoint}: ${error.message}`);
    }

    return null;
  }

  isSuccessStatusCode = statusCode => statusCode / 100 == 2;
}
