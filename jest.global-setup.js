// jest.global-setup.mjs
export default async () => {
    process.env.STRAVA_CLIENT_ID = 'mock_strava_client_id';
    process.env.STRAVA_CLIENT_SECRET = 'mock_strava_client_secret';
    process.env.SESSION_SECRET = 'mock_session_secret';
    process.env.OPENAI_API_KEY = 'mock_openai_api_key';
};
  