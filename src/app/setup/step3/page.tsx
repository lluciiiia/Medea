"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavigationBar from "../components/NavigationBar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { createPrompts, createTables } from "@/app/controllers/tables";
import { createProject } from "@/app/controllers/projects";
import ProjectInfoCard from "./ProjectInfoCard";
import { Template } from "../components/types/templateSetupInterfaces";
import { LoadingSpinner } from "@/app/assets/Loading";
import CustomizationSidebar from "../components/CustomizationSidebar";
import TemplateTabs from "../components/TemplateTabs";
import DroppableTable from "../components/DroppableTable";

const TemplateSetup: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: "Table 1", columns: [] },
  ]);
  const [activeTemplateId, setActiveTemplateId] = useState<number>(1);

  // State to store project data from previous steps
  const [projectCategory, setProjectCategory] = useState<string>(""); // Project category (predefined or custom)
  const [projectCategoryId, setProjectCategoryId] = useState<string>(""); // Category ID (predefined or 'custom')
  const [projectName, setProjectName] = useState<string>("");
  const [productionDate, setProductionDate] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  // Form state
  const [photoshootTopic, setPhotoshootTopic] = useState<string>("");
  const [numSets, setNumSets] = useState<number>(0);
  const [numConcepts, setNumConcepts] = useState<number>(0);
  const [numModels, setNumModels] = useState<number>(0);

  const [videoLength, setVideoLength] = useState<string>("");
  const [numMainCharacters, setNumMainCharacters] = useState<number>(0);
  const [numMainConcepts, setNumMainConcepts] = useState<number>(0);

  const [filmTopic, setFilmTopic] = useState<string>("");
  const [charactersDescription, setCharactersDescription] =
    useState<string>(""); // Keep film-related states
  const [shootingStartDate, setShootingStartDate] = useState<Date | null>(null);
  const [shootingDuration, setShootingDuration] = useState<number>(0);
  const [shootingPlace, setShootingPlace] = useState<string>("");

  const [budget, setBudget] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [inclusion, setInclusion] = useState<string>("");
  const [exclusion, setExclusion] = useState<string>("");
  const [onsetDay, setOnsetDay] = useState<Date | null>(null);
  const [numCrew, setNumCrew] = useState<number>(0);

  const activeTemplate = templates.find(
    (template) => template.id === activeTemplateId
  );

  // Fetch project data from sessionStorage
  useEffect(() => {
    const loadStoredValue = <T,>(
      key: string,
      setter: React.Dispatch<React.SetStateAction<T>>
    ) => {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        if (key.includes("Date") || key.includes("Day")) {
          setter(new Date(storedValue) as unknown as T);
        } else if (!isNaN(Number(storedValue))) {
          setter(Number(storedValue) as unknown as T);
        } else {
          setter(storedValue as unknown as T);
        }
      }
    };

    loadStoredValue("projectCategoryName", setProjectCategory);
    loadStoredValue("projectCategoryId", setProjectCategoryId);
    loadStoredValue("projectName", setProjectName);
    loadStoredValue("productionDate", setProductionDate);
    loadStoredValue("projectDescription", setProjectDescription);

    const storedProjectId = sessionStorage.getItem("projectId");
    if (storedProjectId) {
      setProjectId(storedProjectId);
    }

    loadStoredValue("photoshootTopic", setPhotoshootTopic);
    loadStoredValue("numSets", setNumSets);
    loadStoredValue("numConcepts", setNumConcepts);
    loadStoredValue("numModels", setNumModels);

    loadStoredValue("videoLength", setVideoLength);
    loadStoredValue("numMainCharacters", setNumMainCharacters);
    loadStoredValue("numMainConcepts", setNumMainConcepts);

    // Load Film form values
    loadStoredValue<string>("filmTopic", setFilmTopic);
    loadStoredValue<Date | null>("shootingStartDate", setShootingStartDate);
    loadStoredValue<number>("shootingDuration", setShootingDuration);
    loadStoredValue<string>("shootingPlace", setShootingPlace);

    loadStoredValue("budget", setBudget);
    loadStoredValue("currency", setCurrency);
    loadStoredValue("inclusion", setInclusion);
    loadStoredValue("exclusion", setExclusion);
    loadStoredValue("onsetDay", setOnsetDay);
    loadStoredValue("numCrew", setNumCrew);

    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const handleSaveTable = async () => {
    try {
      setSaveLoading(true);

      // Call the API to create the project
      const projectId = await createProject(
        projectName,
        projectDescription,
        projectCategoryId,
        productionDate,
        // Photography form values
        photoshootTopic,
        numSets,
        numConcepts,
        numModels,
        // Music Video form values
        videoLength,
        numMainCharacters,
        numMainConcepts,
        // Film form values
        filmTopic,
        charactersDescription,
        shootingStartDate,
        shootingDuration,
        shootingPlace,
        // Shared form values
        budget,
        currency,
        inclusion,
        exclusion,
        onsetDay,
        numCrew
      );

      if (!projectId)
        throw new Error("Project ID not returned from createProject.");

      sessionStorage.setItem("projectId", projectId);
      setProjectId(projectId);

      const data = await createPrompts(projectId, templates);
      await createTables(data.prompt, data.projectId);
      handleNext(projectId);
    } catch (error) {
      console.error("Failed to save tables or project:", error);
    } finally {
    }
  };

  const handleNext = (projectId: string) => {
    router.push(`/setup/step4/${projectId}`);
  };

  const formatDate = (date: Date | null): string => {
    return date ? date.toLocaleDateString() : "N/A";
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-white px-16 pt-4">
        <NavigationBar title="Project Setup" />
        <ProgressBar step={3} totalSteps={4} />
        {loading || saveLoading ? (
          <div className="flex h-[600px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4 mt-8">
              <h2 className="text-lg font-semibold text-center text-[#1F2937] mb-8">
                Customize your tables
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <ProjectInfoCard title="Category" content={projectCategory} />
                <ProjectInfoCard title="Project Name" content={projectName} />
                <ProjectInfoCard
                  title="Production Date"
                  content={formatDate(new Date(productionDate))}
                />
                <ProjectInfoCard
                  title="Project Description"
                  content={projectDescription}
                />
              </div>

              <div className="flex gap-4">
                <CustomizationSidebar
                  templates={templates}
                  activeTemplateId={activeTemplateId}
                  setTemplates={setTemplates}
                  projectCategory={projectCategory}
                />
                <div className="w-3/4 overflow-y-auto max-h-[75vh]">
                  <DndProvider backend={HTML5Backend}>
                    <div className="overflow-x-auto whitespace-nowrap flex gap-4 mb-4">
                      <TemplateTabs
                        templates={templates}
                        activeTemplateId={activeTemplateId}
                        setActiveTemplateId={setActiveTemplateId}
                        setTemplates={setTemplates}
                      />
                    </div>

                    <DroppableTable
                      activeTemplate={activeTemplate}
                      templates={templates}
                      setTemplates={setTemplates}
                    />
                  </DndProvider>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between">
                <Button
                  label="Back"
                  onClick={() => router.back()}
                  type="secondary"
                />
                <Button label="Next" onClick={handleSaveTable} type="primary" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default TemplateSetup;
