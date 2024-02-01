import React, { useState } from "react";
import { fetchSuggestions } from "../api/sugesstions"; // Adjust the path as necessary

const SuggestionsComponent = () => {
  const [activities, setActivities] = useState([]); // Your activities data structure
  const [suggestion, setSuggestion] = useState("");

  const handleGetSuggestions = async () => {
    try {
      const suggestionResult = await fetchSuggestions(activities);
      setSuggestion(suggestionResult);
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      // Handle the error appropriately in your UI
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Your UI elements here */}
      <button
        onClick={handleGetSuggestions}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        Get Suggestions
      </button>
      {suggestion && (
        <div
          style={{
            backgroundColor: "#f2f2f2",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#333" }}>Training Suggestions</h2>
          <p style={{ color: "#666", whiteSpace: "pre-line" }}>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default SuggestionsComponent;
