import React from "react";

class StravaLoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      import.meta.env.VITE_STRAVA_REDIRECT_URI
    );

    // Include additional permissions in the scope parameter
    const scope = "read,read_all,activity:read,activity:write"; // Add your additional permissions here

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}`;

    window.location.href = authUrl;
  }

  render() {
    return <button onClick={this.handleLogin}>Login with Strava</button>;
  }
}

export default StravaLoginButton;
