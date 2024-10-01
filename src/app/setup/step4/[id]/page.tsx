"use client";

import { getTables } from "@/app/controllers/tables";
import "../../../styles/tables.css";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/app/setup/components/NavigationBar";
import ProgressBar from "@/app/setup/components/ProgressBar";
import Button from "@/app/setup/components/Button";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/assets/Loading";
import Tables from "./Tables";

export default function TablePage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const [tables, setTables] = useState<string | "">("");
  const [references, setReferences] = useState<string | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTables(projectId);
        console.log("data", data);
        const cleanedTables = data.tables.replace(/^"+|"+$/g, "").trim(); // Remove unnecessary quotes if any
        const cleanedReferences = data.references
          ? data.references.replace(/^"+|"+$/g, "").trim()
          : ""; // Clean references if any

        setTables(cleanedTables);
        setReferences(cleanedReferences);
      } catch (err) {
        console.error("Failed to fetch tables and references:", err);
        setError("Failed to fetch tables.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleBack = () => {
    router.back(); // Go back to the previous page
  };

  const handleNext = () => {
    router.push(`/dashboard`); // Navigate to the next page, adjust this route as needed
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white px-16 pt-4">
      {/* Top Navigation Bar and Progress Bar */}
      <NavigationBar title="Project Setup" />
      <ProgressBar step={4} totalSteps={4} />
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Render Tables and References */}
          <Tables tables={tables} references={references} loading={loading} />

          {/* Action Buttons at the bottom */}
          <div className="w-full container mx-auto px-4 py-8 flex justify-between">
            <Button label="Back" onClick={handleBack} type="secondary" />
            <Button label="Next" onClick={handleNext} type="primary" />
          </div>
        </>
      )}
    </div>
  );
}
