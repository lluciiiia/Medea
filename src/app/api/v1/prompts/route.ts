import { type NextRequest, NextResponse } from "next/server";
import { supabaseUrl, supabaseAnonKey } from "../../../supabaseClient";
import { createClient } from "@supabase/supabase-js";
import { createPrjInformation } from "../utils/create-project-info";
import { generatePrompt } from "../utils/generate-prompt";

export const POST = async (req: NextRequest) => {
  const { projectId, tables }: any = await req.json();

  if (!projectId || !tables || tables.length === 0) {
    return NextResponse.json(
      { error: "Missing project description or tables" },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId);

  if (error || !data || data.length === 0)
    return NextResponse.json({ error: "Project not found" }, { status: 400 });

  const projectDescription = data[0].description;
  const projectInformation = createPrjInformation(data[0]);

  const prompt = generatePrompt(projectDescription, projectInformation, tables);

  // Return the prompt and any other relevant data for the second API
  return NextResponse.json(
    { prompt: prompt, projectId: projectId },
    { status: 200 }
  );
};
