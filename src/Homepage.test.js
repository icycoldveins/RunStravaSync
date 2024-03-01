import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { UserContext } from './contexts/UserContext';

// Mock Chart.js
jest.mock('chart.js/auto', () => ({
  Chart: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
  })),
}));

// Utility function for rendering the component within the mocked UserContext
const renderWithUserContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
    renderOptions
  );
};

describe('HomePage', () => {
  it('renders welcome message for the user', () => {
    const user = { firstname: 'John' };
    const userActivities = [];

    renderWithUserContext(<HomePage />, {
      providerProps: { user, userActivities },
    });

    expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument();
  });

  it('shows no activities message when there are no user activities', () => {
    const user = { firstname: 'John' };
    const userActivities = [];

    renderWithUserContext(<HomePage />, {
      providerProps: { user, userActivities },
    });

    expect(screen.getByText(/No activities to display./i)).toBeInTheDocument();
  });

  // Add more tests here to cover other aspects of your component,
  // such as rendering charts for activities, handling different types of activities,
  // and ensuring the charts are properly updated when the activities change.
});
