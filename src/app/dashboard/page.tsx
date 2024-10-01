"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProjectOverviewCard from "./components/ProjectOverviewCard";
import { useRouter } from "next/navigation";
import { getProjects, deleteProjectById } from "../controllers/projects";
import {
  FiGrid,
  FiTool,
  FiPhone,
  FiUsers,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { LoadingSpinner } from "../assets/Loading";

const menuItems = [
  { label: "Projects", icon: FiGrid, link: "/dashboard", active: true },
  { label: "Resources", icon: FiTool, link: "/dashboard" },
  { label: "Contacts", icon: FiPhone, link: "/dashboard" },
  { label: "Teams", icon: FiUsers, link: "/dashboard" },
  { label: "Account", icon: FiUser, link: "/dashboard" },
  { label: "Setting", icon: FiSettings, link: "/dashboard" },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch projects using the controller's getProjects function
    const loadProjects = async () => {
      try {
        const projectData = await getProjects(); // Fetch projects from the controller
        setProjects(projectData); // Set the fetched projects
        setFilteredProjects(projectData); // Initially show all projects
      } catch (error) {
        console.error("Error loading projects:", error);
        // Handle error or redirect if necessary
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    loadProjects();
  }, []);

  // Handle search input from Navbar
  const handleSearch = (searchTerm: string) => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  // Handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmed) return;

    try {
      await deleteProjectById(projectId); // Use controller to delete the project

      // After successful deletion, remove the project from state
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
    } catch (error) {
      console.error(`Error deleting project ${projectId}:`, error);
      alert("Failed to delete the project. Please try again.");
    }
  };

  // Handle redirection to the setup step 1
  const handleCreateProject = () => {
    router.push("/setup/step1");
  };

  if (loading) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex bg-[#F7F9FC] h-screen">
      <Sidebar menuItems={menuItems} />

      <div className="flex-grow flex flex-col relative">
        <Navbar onSearch={handleSearch} />
        <div className="relative p-8 bg-[#F7F9FC] flex-grow overflow-y-auto">
          <h1 className="text-2xl font-bold text-[#2A3659] mb-8">
            My Projects
          </h1>

          {filteredProjects.length === 0 ? (
            <div>No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectOverviewCard
                  key={project.id}
                  projectId={project.id}
                  name={project.name || "Untitled"}
                  category={project.categories?.name || "No Category"}
                  description={project.description || "No Description"}
                  createdDate={new Date(
                    project.production_date
                  ).toLocaleDateString()}
                  link={`/projects/${project.id}`}
                  onDelete={() => handleDeleteProject(project.id)} // Handle deletion
                />
              ))}
            </div>
          )}

          <button
            onClick={handleCreateProject}
            className="absolute top-6 right-10 bg-gradient-to-r from-[#F8AB5E] to-[#F36961] text-white font-semibold px-6 py-2 rounded-full shadow-lg z-10 hover:shadow-md transition duration-300">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
