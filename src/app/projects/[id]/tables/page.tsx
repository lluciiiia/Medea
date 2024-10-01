"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../components/NavBar";
import Tables from "../../../setup/step4/[id]/Tables";
import {
  FiGrid,
  FiFile,
  FiUsers,
  FiSettings,
  FiList,
  FiCalendar,
} from "react-icons/fi";
import "../../../styles/tables.css";
import { getTables } from "@/app/controllers/tables";
import { LoadingSpinner } from "@/app/assets/Loading";

// Sidebar menu items
const menuItems = [
  { label: "Overview", icon: FiGrid, link: "/projects/[id]", active: false },
  {
    label: "Tables",
    icon: FiGrid,
    link: "/projects/[id]/tables",
    active: true,
  },
  { label: "Tasks", icon: FiList, link: "/projects/[id]/tasks" },
  { label: "Files", icon: FiFile, link: "/projects/[id]/files" },
  { label: "Team", icon: FiUsers, link: "/projects/[id]/team" },
  { label: "Calendar", icon: FiCalendar, link: "/projects/[id]/calendar" },
  { label: "Settings", icon: FiSettings, link: "/projects/[id]/settings" },
];

export default function TablePage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const [tables, setTables] = useState<string | null>(null); // Store table data
  const [references, setReferences] = useState<string | null>(null); // Store reference data
  const [projectName, setProjectName] = useState<string | null>(null); // Store project name
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state
  const router = useRouter();

  // Fetch project details and tables
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project name from the API
        const projectResponse = await fetch(`/api/v1/projects/${projectId}`);
        if (!projectResponse.ok) {
          throw new Error("Failed to fetch project details.");
        }
        const { project } = await projectResponse.json();
        setProjectName(project?.name || `Project ${projectId}`);

        // Fetch tables and references
        const data = await getTables(projectId);
        const cleanedTables = data.tables.replace(/^"+|"+$/g, "").trim(); // Remove unnecessary quotes if any
        const referencesData = data.references; // Fetch references if available

        setTables(cleanedTables);
        setReferences(referencesData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load project or tables.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  // Handle Back and Next button clicks
  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push(`/dashboard`); // You can replace this with the next desired route
  };

  // Dummy search handler (can be removed if unnecessary)
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  // Update sidebar links to include project ID dynamically
  const updatedMenuItems = menuItems.map((item) => ({
    ...item,
    link: item.link.replace("[id]", projectId),
  }));

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex bg-[#F7F9FC] h-screen">
            {/* Sidebar */}
            <Sidebar menuItems={updatedMenuItems} />

            {/* Main content area */}
            <div className="flex-grow flex flex-col relative">
              {/* Top Navbar */}
              <Navbar
                projectName={projectName || `Project ${projectId}`}
                onSearch={handleSearch}
              />{" "}
              {/* Use projectName if available */}
              {/* Main content displaying project details */}
              <div className="relative p-8 bg-[#F7F9FC] flex-grow overflow-y-auto">
                {/* Render the tables and references */}
                <Tables
                  tables={tables}
                  references={references}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
