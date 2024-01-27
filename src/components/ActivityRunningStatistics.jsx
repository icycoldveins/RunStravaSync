import React from "react";

function ActivityRunningStatistics({ activities }) {
  return (
    <div>
      <h3>Running Statistics</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>Name:</strong> {activity.name} <br />
            <strong>Type:</strong> {activity.type} <br />
            <strong>Date:</strong> {new Date(activity.start_date).toLocaleDateString()} <br />
            <strong>Distance:</strong> {activity.distance} meters <br />
            <strong>Max Heart Rate:</strong> {activity.max_heartrate} bpm <br />
            <strong>Calories Burned:</strong> {activity.calories} calories <br />
            <strong>Average Speed:</strong> {activity.average_speed} m/s <br />
            <strong>Max Speed:</strong> {activity.max_speed} m/s <br />
            <strong>Average Heart Rate:</strong> {activity.average_heartrate} bpm
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityRunningStatistics;
