import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "../../../supabaseClient";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select(`*, categories(name)`)
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        { error: "Error fetching projects" },
        { status: 500 }
      );
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const {
    userId,
    projectName,
    projectDescription,
    projectCategoryId,
    productionDate,
    photoshootTopic,
    numSets,
    numConcepts,
    numModels,
    videoLength,
    numMainCharacters,
    numMainConcepts,
    filmTopic,
    charactersDescription,
    shootingStartDate,
    shootingDuration,
    shootingPlace,
    budget,
    currency,
    inclusion,
    exclusion,
    onsetDay,
    numCrew,
  }: any = await req.json();

  if (!projectName || !projectDescription || !productionDate || !userId) {
    return NextResponse.json(
      { error: "Missing project information" },
      { status: 400 }
    );
  }

  try {
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          user_id: userId,
          name: projectName,
          description: projectDescription,
          production_date: productionDate,
          category_id: projectCategoryId,
          photoshoot_topic: photoshootTopic || null,
          num_sets: numSets || null,
          num_concepts: numConcepts || null,
          num_models: numModels || null,
          video_length: videoLength || null,
          num_main_characters: numMainCharacters || null,
          num_main_concepts: numMainConcepts || null,
          film_topic: filmTopic || null,
          char_description: charactersDescription || null,
          shooting_start_date: shootingStartDate || null,
          shooting_duration: shootingDuration || null,
          shooting_place: shootingPlace || null,
          budget: budget || null,
          currency: currency || null,
          inclusion: inclusion || null,
          exclusion: exclusion || null,
          onset_day: onsetDay || null,
          num_crew: numCrew || null,
        },
      ])
      .select("id")
      .single();

    if (projectError) {
      console.error("Error inserting project data:", projectError);
      return NextResponse.json(
        { error: "Error creating project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ projectId: projectData.id }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating project:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
};
