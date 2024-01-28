import React from "react";

function ElevationProfileStatistics({ activities }) {
  // Example function to calculate total elevation gain
  const calculateTotalElevationGain = (activities) => {
    // This is a placeholder function. You would replace this logic
    // with the actual calculation based on your elevation data points.
    return activities.reduce(
      (total, activity) => total + activity.total_elevation_gain,
      0
    );
  };

  return (
    <div>
      <h3>Elevation Profile Statistics</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>Name:</strong> {activity.name} <br />
            <strong>Date:</strong>{" "}
            {new Date(activity.start_date).toLocaleDateString()} <br />
            <strong>Total Elevation Gain:</strong>{" "}
            {activity.total_elevation_gain} meters <br />
            <strong>Highest Point:</strong> {activity.elev_high} meters <br />
            <strong>Lowest Point:</strong> {activity.elev_low} meters
          </li>
        ))}
        <li>
          <strong>Total Elevation Gain (All Activities):</strong>{" "}
          {calculateTotalElevationGain(activities)} meters
        </li>
      </ul>
    </div>
  );
}

export default ElevationProfileStatistics;
