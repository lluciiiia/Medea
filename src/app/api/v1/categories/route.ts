import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "../../../supabaseClient";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GET = async (req: NextRequest) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name")
      .eq("created_by_user", false);

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(
        { error: "Error fetching categories" },
        { status: 500 }
      );
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Unexpected error fetching categories:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
};
