import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { UserContext } from './contexts/UserContext';
import Chart from 'chart.js/auto';

// Mock Chart.js to prevent it from trying to render actual charts in a test environment
jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  })),
}));

const mockUser = {
  firstname: 'John',
};

const mockActivities = [
  { type: 'Run', name: 'Morning Run', distance: 5000, duration: 1800 },
  { type: 'WeightTraining', name: 'Gym Session', elapsed_time: 3600 },
];

// Helper function to render HomePage within the mocked UserContext
const renderHomePageWithContext = (user, userActivities) =>
  render(
    <UserContext.Provider value={{ user, userActivities }}>
      <HomePage />
    </UserContext.Provider>
  );

describe('HomePage', () => {
  it('renders welcome message for the user', () => {
    renderHomePageWithContext(mockUser, mockActivities);
    expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument();
  });

  it('renders running activities if available', () => {
    renderHomePageWithContext(mockUser, mockActivities);
    expect(screen.getByText(/Running Activities/i)).toBeInTheDocument();
    expect(screen.getByText(/Morning Run/i)).toBeInTheDocument(); // Assuming your ActivityRunningStatistics component renders activity names
  });

  it('renders weight training activities if available', () => {
    renderHomePageWithContext(mockUser, mockActivities);
    expect(screen.getByText(/Weight Training Activities/i)).toBeInTheDocument();
    expect(screen.getByText(/Gym Session/i)).toBeInTheDocument(); // Assuming your WeightLiftingStatistics component renders activity names
  });

  it('displays a message if no activities are available', () => {
    renderHomePageWithContext(mockUser, []);
    expect(screen.getByText(/No activities to display./i)).toBeInTheDocument();
  });

  // Additional tests can be added here to cover more scenarios
});
