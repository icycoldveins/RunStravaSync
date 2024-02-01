async function fetchSuggestions(activities) {
  try {
    const response = await fetch("http://localhost:3001/api/generate-suggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activities }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
    }

    const data = await response.json();
    return data.suggestion;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}
export {fetchSuggestions};
