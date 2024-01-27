# RunnerSync
![Alt text](<Screenshot 2024-01-27 at 6.48.55 PM.png>)
## Overview

RunnerSync is a fitness tracking and analysis platform designed for track and field athletes. It offers specialized tools and insights to help athletes enhance their performance, strategize their training, and achieve their athletic goals by integrating seamlessly with Strava.

## Features

### Strava Integration

- Sync your Strava activities to analyze your track and field performances effortlessly.
- Automatically import data from various track and field events, including runs, jumps, and throws.

### Advanced Analytics

- Dive deep into analytics with metrics like speed, elevation changes, heart rate, and more.
- Visualize your performance with interactive charts and graphs.

### Goal Setting and Progress Tracking

- Personalize your goals for different track and field events and monitor your progress.
- Adapt your training methods based on data-driven insights.

### Customizable Dashboard

- Tailor your dashboard to highlight the most important metrics for you.
- Gain quick insights into your daily, weekly, and monthly activities.

### Community Features

- Connect and engage with fellow track and field athletes.
- Participate in community challenges and contests to challenge your skills.

### Mobile Compatibility

- Access your data on the go with a responsive, mobile-friendly design.

## Tech Stack

- **Frontend**: React.js with Redux for state management, D3.js for data visualizations.
- **Backend**: Node.js and Express for server-side operations.
- **Database**: MongoDB for efficient data storage.
- **API Integration**: Strava API for seamless activity data synchronization.
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

## Contributing

We welcome contributions from everyone, including bug fixes, feature additions, or improvements in documentation.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.