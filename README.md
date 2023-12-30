# RunStravaSync

## Overview

RunStravaSync is an innovative fitness tracking and analysis platform, meticulously tailored for track and field athletes. By leveraging the power of Strava integration, RunStravaSync offers specialized tools and insights to help athletes enhance their performance, strategize their training, and achieve their athletic goals.

## Features

### Strava Integration

- Effortlessly synchronize your Strava activities to analyze your track and field performances.
- Automatic import of runs, jumps, throws, and more.

### Advanced Analytics

- In-depth analytics on speed, elevation changes, heart rate, and additional vital metrics.
- Interactive charts and graphs for a comprehensive performance overview.

### Goal Setting and Progress Tracking

- Personalize your objectives for different track and field events.
- Track your development over time and adapt your training methods accordingly.

### Customizable Dashboard

- Tailor your dashboard to highlight your most crucial metrics.
- Get a quick overview of your daily, weekly, and monthly activities.

### Community Features

- Connect and interact with fellow track and field athletes.
- Engage in community challenges and contests to test your skills.

### Mobile Compatibility

- Access your data anywhere with a responsive mobile-friendly design.

## Tech Stack

- **Frontend**: React.js with Redux for state management, D3.js for data visualizations.
- **Backend**: Node.js and Express for server-side operations.
- **Database**: MongoDB for efficient data storage.
- **API Integration**: Strava API for seamless activity data sync.
- **Authentication**: Secure OAuth integration with Strava.
- **Hosting**: AWS for robust scalability.
- **Testing**: Jest for frontend tests, Mocha for backend tests.
- **CI/CD**: Automated workflows with GitHub Actions.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB setup
- Active Strava account

### Installation

1. Clone the SprintSync repository:
   ```bash
   git clone https://github.com/icycoldveins/SprintSync.git
   ```
2. Install NPM packages:
   ```bash
   cd SprintSync
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

## Contributing

We welcome contributions from everyone. Whether it's bug fixes, feature additions, or improvements in documentation, your help is valuable.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
