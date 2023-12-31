import React from "react";

class StravaLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const clientId = "YOUR_CLIENT_ID"; // Replace with your Strava Client ID
    const redirectUri = encodeURIComponent("YOUR_REDIRECT_URI"); // Replace with your Redirect URI
    const scope = "read"; // Adjust the scope as needed

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}`;

    window.location.href = authUrl;
  }

  render() {
    return <button onClick={this.handleLogin}>Login with Strava</button>;
  }
}

export default StravaLoginButton;
