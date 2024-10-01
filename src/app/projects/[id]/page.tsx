"use client";

import React, { useState, useEffect } from "react";
import {
  FiGrid,
  FiFile,
  FiUsers,
  FiSettings,
  FiList,
  FiCalendar,
} from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import Navbar from "./components/NavBar";
import { useRouter } from "next/navigation";
import { getTables } from "@/app/controllers/tables";
import { LoadingSpinner } from "@/app/assets/Loading";

const menuItems = [
  { label: "Overview", icon: FiGrid, link: "/projects/[id]", active: true },
  { label: "Tables", icon: FiGrid, link: "/projects/[id]/tables" },
  { label: "Tasks", icon: FiList, link: "/projects/[id]/tasks" },
  { label: "Files", icon: FiFile, link: "/projects/[id]/files" },
  { label: "Team", icon: FiUsers, link: "/projects/[id]/team" },
  { label: "Calendar", icon: FiCalendar, link: "/projects/[id]/calendar" },
  { label: "Settings", icon: FiSettings, link: "/projects/[id]/settings" },
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [project, setProject] = useState<any>(null);
  const [tables, setTables] = useState<string | null>(null);
  const [references, setReferences] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch project details and tables from the API
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch tables and references
        const data = await getTables(id);
        const cleanedTables = data.tables.replace(/^"+|"+$/g, "").trim(); // Removes leading/trailing quotes
        const references = data.references;
        setTables(cleanedTables);
        setReferences(references);

        // Fetch project details
        const response = await fetch(`/api/v1/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const { project } = await response.json();
        setProject(project);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        Project not found
      </div>
    );
  }

  const updatedMenuItems = menuItems.map((item) => ({
    ...item,
    link: item.link.replace("[id]", id),
  }));

  return (
    <>
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex bg-[#F7F9FC] h-screen">
            <Sidebar menuItems={updatedMenuItems} />

            <div className="flex-grow flex flex-col relative">
              <Navbar onSearch={handleSearch} projectName={project.name} />

              <div className="relative p-8 bg-[#F7F9FC] flex-grow overflow-y-auto">
                <h1 className="text-2xl font-bold text-[#2A3659] mb-8">
                  Overview
                </h1>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-3xl font-semibold text-[#2A3659] mb-4">
                    {project.name || "Untitled Project"}
                  </h2>

                  <p className="text-gray-500 mb-4">
                    {project.description ||
                      "No description available for this project."}
                  </p>

                  <p className="text-gray-400">
                    <strong>Production Date:</strong>{" "}
                    {new Date(project.production_date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  className="absolute top-6 right-10 bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white font-semibold px-6 py-2 rounded-full shadow-lg z-10 hover:shadow-md transition duration-300"
                  onClick={() => router.push(`/projects/${project.id}/edit`)}>
                  Edit Project
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
