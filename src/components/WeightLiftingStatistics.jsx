import React from "react";

function WeightLiftingStatistics({ activities }) {
  return (
    <div>
      <h3>Weight Training Statistics</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>Name:</strong> {activity.name}
            <br />
            <strong>Date:</strong> {new Date(activity.start_date).toLocaleDateString()}
            <br />
            <strong>Max Heart Rate:</strong> {activity.max_heartrate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeightLiftingStatistics;
