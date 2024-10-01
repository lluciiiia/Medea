import { supabase } from "../supabaseClient";

export async function createProject(
  projectName: string,
  projectDescription: string,
  projectCategoryId: string,
  productionDate: string,
  photoshootTopic: string,
  numSets: number,
  numConcepts: number,
  numModels: number,
  videoLength: string,
  numMainCharacters: number,
  numMainConcepts: number,
  filmTopic: string,
  charactersDescription: string,
  shootingStartDate: Date | null,
  shootingDuration: number,
  shootingPlace: string,
  budget: number,
  currency: string,
  inclusion: string,
  exclusion: string,
  onsetDay: Date | null,
  numCrew: number
) {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session?.user) return;

  try {
    const response = await fetch("/api/v1/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        projectName: projectName,
        projectDescription: projectDescription,
        projectCategoryId: projectCategoryId,
        productionDate: productionDate,
        photoshootTopic: photoshootTopic,
        numSets: numSets,
        numConcepts: numConcepts,
        numModels: numModels,
        videoLength: videoLength,
        numMainCharacters: numMainCharacters,
        numMainConcepts: numMainConcepts,
        filmTopic: filmTopic,
        charactersDescription: charactersDescription,
        shootingStartDate: shootingStartDate,
        shootingDuration: shootingDuration,
        shootingPlace: shootingPlace,
        budget: budget,
        currency: currency,
        inclusion: inclusion,
        exclusion: exclusion,
        onsetDay: onsetDay,
        numCrew: numCrew,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data.projectId;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function getProjects() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session?.user) {
    console.error("User not logged in");
    return [];
  }

  try {
    const response = await fetch(`/api/v1/projects?userId=${session.user.id}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export const deleteProjectById = async (projectId: string) => {
  try {
    const response = await fetch(`/api/v1/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error deleting project: ${response.statusText}`);

    return true;
  } catch (error) {
    console.error(`Error deleting project with ID ${projectId}:`, error);
    throw error;
  }
};
