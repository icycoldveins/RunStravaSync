# RunnerSync
![Alt text](<Screenshot 2024-01-27 at 6.48.55 PM.png>)
![Alt text](<Screenshot 2024-02-01 at 4.37.07 PM.png>)

# Overview

RunnerSync is a fitness tracking and analysis platform designed for track and field athletes. It seamlessly integrates with Strava, offering specialized tools and insights to help athletes enhance their performance and achieve their athletic goals.

## Features

### Strava Integration

- Sync your Strava activities to analyze your track and field performances effortlessly.
- Automatically import data from various track and field events, including runs, jumps, and throws.

### Advanced Analytics

- Dive into analytics with metrics like speed, elevation changes, heart rate, and more.
- Visualize your performance with interactive charts and graphs.

### AI-Driven Insights and Suggestions

- Utilize OpenAI integration to receive personalized training and recovery suggestions.
- Enhance your training regimen with AI-generated actionable insights based on your performance data.

### Mobile Compatibility

- Access your data on the go with a responsive, mobile-friendly design.

## Tech Stack

- **Frontend**: React.js with Redux for state management, D3.js for data visualizations.
- **Backend**: Node.js and Express for server-side operations.
- **Database**: MongoDB for efficient data storage.
- **API Integration**: Strava API for seamless activity data synchronization and OpenAI for generating insights.
- **Authentication**: Secure OAuth integration with Strava.
- **Hosting**: AWS for robust scalability.
- **Testing**: Jest for frontend tests, Mocha for backend tests.
- **CI/CD**: Automated workflows with GitHub Actions.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB set up
- Active Strava account

### Installation

1. Clone the RunnerSync repository:
   ```bash
   git clone https://github.com/icycoldveins/RunnerSync.git
   ```
2. Install NPM packages:
   ```bash
   cd RunnerSync
   npm install
   ```
3. Set up your `.env` file with necessary credentials:
   ```
   STRAVA_CLIENT_ID=your_client_id
   STRAVA_CLIENT_SECRET=your_client_secret
   MONGO_URI=your_mongo_uri
   ```
4. Run the application:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
