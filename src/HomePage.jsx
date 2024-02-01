import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "./contexts/UserContext";
import Chart from "chart.js/auto";
import ActivityRunningStatistics from "./components/ActivityRunningStatistics.jsx";
import WeightLiftingStatistics from "./components/WeightLiftingStatistics.jsx";
import ElevationProfileStatistics from "./components/ElevationProfileStatistics.jsx";
import StatisticsViewer from "./components/StatisticsViewer.jsx";
function HomePage() {
  const { user, userActivities } = useContext(UserContext);

  // Filter running activities
  const runningActivities = userActivities.filter(
    (activity) => activity.type === "Run"
  );

  // Filter weight training activities
  const weightTrainingActivities = userActivities.filter(
    (activity) => activity.type === "WeightTraining"
  );

  // Reference to the running chart canvas
  const runningChartRef = useRef(null);

  // Reference to the weight training chart canvas
  const weightTrainingChartRef = useRef(null);

  // Reference to the elevation chart canvas
  const elevationChartRef = useRef(null);

  useEffect(() => {
    if (runningActivities.length === 0 || !runningChartRef.current) return;

    // Destroy previous running chart if it exists
    if (runningChartRef.current.chart) {
      runningChartRef.current.chart.destroy();
    }

    // Create a new running chart
    const runningChart = new Chart(runningChartRef.current, {
      type: "bar",
      data: {
        labels: runningActivities.map((activity) => activity.name),
        datasets: [
          {
            label: "Distance (meters)",
            data: runningActivities.map((activity) => activity.distance),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Distance (meters)",
            },
          },
        },
      },
    });

    // Store the chart instance in the ref
    runningChartRef.current.chart = runningChart;
  }, [runningActivities]);

  useEffect(() => {
    if (
      weightTrainingActivities.length === 0 ||
      !weightTrainingChartRef.current
    )
      return;

    // Destroy previous weight training chart if it exists
    if (weightTrainingChartRef.current.chart) {
      weightTrainingChartRef.current.chart.destroy();
    }

    // Create a new weight training chart
    const weightTrainingChart = new Chart(weightTrainingChartRef.current, {
      type: "bar",
      data: {
        labels: weightTrainingActivities.map((activity) => activity.name),
        datasets: [
          {
            label: "Duration (seconds)",
            data: weightTrainingActivities.map(
              (activity) => activity.elapsed_time
            ),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Duration (seconds)",
            },
          },
        },
      },
    });

    // Store the chart instance in the ref
    weightTrainingChartRef.current.chart = weightTrainingChart;
  }, [weightTrainingActivities]);

  useEffect(() => {
    if (runningActivities.length === 0 || !elevationChartRef.current) return;

    // Destroy previous elevation chart if it exists
    if (elevationChartRef.current.chart) {
      elevationChartRef.current.chart.destroy();
    }

    // Create a new elevation chart
    const elevationChart = new Chart(elevationChartRef.current, {
      type: "line",
      data: {
        labels: runningActivities.map((_, index) => `Point ${index + 1}`),
        datasets: [
          {
            label: "Elevation (meters)",
            data: runningActivities.map(
              (activity) => activity.total_elevation_gain
            ), // Simulated elevation data
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Elevation (meters)",
            },
          },
        },
      },
    });

    // Store the chart instance in the ref
    elevationChartRef.current.chart = elevationChart;
  }, [runningActivities]);

  return (
    <div>
      <h1>Welcome to RunnerSync</h1>
      {user && <p>Welcome back, {user.firstname}!</p>}

      {/* Display bar chart for running activities */}
      {runningActivities.length > 0 && (
        <div>
          <h2>Running Activities</h2>
          <canvas ref={runningChartRef} />
          <ActivityRunningStatistics activities={runningActivities} />
          <canvas ref={elevationChartRef} />
          <ElevationProfileStatistics activities={runningActivities} />
        </div>
      )}

      {/* Display bar chart for weight training activities */}
      {weightTrainingActivities.length > 0 && (
        <div>
          <h2>Weight Training Activities</h2>
          <canvas ref={weightTrainingChartRef} />
          <WeightLiftingStatistics activities={weightTrainingActivities} />
        </div>
      )}

      {/* Display message if no running or weight training activities */}
      {runningActivities.length === 0 &&
        weightTrainingActivities.length === 0 && (
          <p>No activities to display.</p>
        )}
        <StatisticsViewer></StatisticsViewer>
    </div>
  );
}

export default HomePage;
