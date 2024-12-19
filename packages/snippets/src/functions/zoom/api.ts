export async function callApi(action: string, data: any) {
  try {
    const response = await fetch("/api/zoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, ...data }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
