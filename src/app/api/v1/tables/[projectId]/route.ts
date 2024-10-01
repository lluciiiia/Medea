import { type NextRequest, NextResponse } from "next/server";
import { supabaseUrl, supabaseAnonKey } from "../../../../supabaseClient";
import { createClient } from "@supabase/supabase-js";

export const GET = async (
  req: NextRequest,
  { params }: { params: { projectId: string } }
) => {
  const { projectId } = params;

  if (!projectId)
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("tables")
      .select("*")
      .eq("project_id", projectId);

    if (error)
      return NextResponse.json({ error: "Tables not found" }, { status: 400 });

    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tables:", error);
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    );
  }
};
