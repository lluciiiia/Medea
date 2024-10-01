import { type NextRequest, NextResponse } from "next/server";
import { API_KEY, genModel } from "@/app/api/v1/gemini-settings";
import { supabaseUrl, supabaseAnonKey } from "../../../supabaseClient";
import { createClient } from "@supabase/supabase-js";

export const POST = async (req: NextRequest) => {
  const { prompt, projectId }: any = await req.json();

  if (!prompt || !projectId) {
    return NextResponse.json(
      { error: "Missing prompt or projectId" },
      { status: 400 }
    );
  }

  if (!API_KEY) throw new Error("Missing API key");

  let htmlTables = "";
  let references = "";

  try {
    const result = await genModel.generateContent(prompt.trim());
    const response = result.response;
    const responseText = await response.text();

    let splitedResponse = responseText.split("<<References>>");
    htmlTables = splitedResponse[0];
    references = splitedResponse[1];
  } catch (error) {
    console.error("Error fetching htmlTables:", error);
    return NextResponse.json(
      { error: "Failed generating tables" },
      { status: 500 }
    );
  }

  if (htmlTables === "" || references === "")
    return NextResponse.json(
      { error: "Failed generating tables" },
      { status: 500 }
    );

  // Insert into the database
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    await supabase.from("tables").insert([
      {
        project_id: projectId,
        tables: htmlTables,
        references: references,
      },
    ]);
  } catch (error) {
    console.error("Unexpected error during save:", error);
    return NextResponse.json(
      { error: "Error occurred while saving the table" },
      { status: 500 }
    );
  }

  return NextResponse.json({ htmlTables: htmlTables }, { status: 201 });
};
