export const getCategories = async () => {
  try {
    const response = await fetch("/api/v1/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error fetching categories: ${response.statusText}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories from API:", error);
    throw error;
  }
};
