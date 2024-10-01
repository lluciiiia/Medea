export async function getTables(projectId: string) {
  try {
    const response = await fetch(`/api/v1/tables/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
}

export async function createPrompts(projectId: string, tables: any[]) {
  try {
    const response = await fetch("/api/v1/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: projectId,
        tables: tables.map((table) => ({
          name: table.name,
          columns: table.columns.map((col: any) => col.content).join(", "),
        })),
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // This will return the prompt and projectId from the API
  } catch (error) {
    console.error("Error preparing tables:", error);
    throw error;
  }
}

export async function createTables(prompt: string, projectId: string) {
  try {
    const response = await fetch("/api/v1/tables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        projectId: projectId,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // This will return the generated HTML tables
  } catch (error) {
    console.error("Error generating tables:", error);
    throw error;
  }
}
