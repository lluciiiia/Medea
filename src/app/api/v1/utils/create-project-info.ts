export const createPrjInformation = (project: any) => {
  const {
    category_id,
    budget,
    currency,
    inclusion,
    exclusion,
    onset_day,
    num_crew,
    production_date,
    photoshoot_topic,
    num_sets,
    num_concepts,
    num_models,
    video_length,
    num_main_characters,
    num_main_concepts,
    film_topic,
    char_description,
    shooting_start_date,
    shooting_duration,
    shooting_place,
  } = project;

  let projectInfo = "";

  // Common fields for all categories
  projectInfo += `Budget: ${budget} ${currency}, Inclusion: ${
    inclusion || "None"
  }, Exclusion: ${
    exclusion || "None"
  }, Onset Day: ${onset_day}, Number of Crew: ${num_crew}, Production Date: ${production_date}.\n`;

  // Fields unique to each category
  switch (category_id) {
    case "3169ff85-31de-4064-88e1-429719544b40": // Photography
      projectInfo += `Photoshoot Topic: ${photoshoot_topic}, Number of Sets: ${num_sets}, Number of Concepts: ${num_concepts}, Number of Models: ${num_models}.\n`;
      break;
    case "48f804fe-312e-4d62-b01c-6481d8c29fac": // Music Video
      projectInfo += `Video Length: ${video_length} minutes, Number of Main Characters: ${num_main_characters}, Number of Main Concepts: ${num_main_concepts}.\n`;
      break;
    case "c57ab3a0-8319-4c00-bed5-e3dba70c0a68": // Film
      projectInfo += `Film Topic: ${film_topic}, Number of Main Characters: ${num_main_characters}, Character Description: ${char_description}, Shooting Start Date: ${shooting_start_date}, Shooting Duration: ${shooting_duration}, Shooting Place: ${shooting_place}.\n`;
      break;
    default:
      projectInfo += `N/A.\n`;
  }

  return projectInfo.trim();
};
