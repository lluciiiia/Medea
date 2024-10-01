import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import {
  FilmRecommendations,
  MusicVideoRecommendations,
  PhotographyRecommendations,
} from "./types/recommendations";
import { Column, Template } from "./types/templateSetupInterfaces";

const recommendationsByCategory: Record<string, Template[]> = {
  Photography: PhotographyRecommendations,
  "Music Video": MusicVideoRecommendations,
  Film: FilmRecommendations,
};

interface CustomizationSidebarProps {
  templates: Template[];
  activeTemplateId: number;
  setTemplates: (templates: Template[]) => void;
  projectCategory: string;
}

const CustomizationSidebar: React.FC<CustomizationSidebarProps> = ({
  templates,
  activeTemplateId,
  setTemplates,
  projectCategory,
}) => {
  const [openedTemplateId, setOpenedTemplateId] = useState<number | null>(null);

  const addColumnToTemplate = (column: Column) => {
    const updatedTemplates = [...templates];
    const activeTemplateIndex = templates.findIndex(
      (t) => t.id === activeTemplateId
    );
    const template = updatedTemplates[activeTemplateIndex];
    if (column && !template.columns.some((col) => col.id === column.id)) {
      template.columns.push(column);
    }
    setTemplates(updatedTemplates);
  };

  const addAllColumnsToTemplate = (template: Template) => {
    const updatedTemplates = [...templates];
    const activeTemplateIndex = templates.findIndex(
      (t) => t.id === activeTemplateId
    );
    const activeTemplate = updatedTemplates[activeTemplateIndex];

    template.columns.forEach((column) => {
      if (!activeTemplate.columns.some((col) => col.id === column.id)) {
        activeTemplate.columns.push(column);
      }
    });

    setTemplates(updatedTemplates);
  };

  // Get recommendations based on the project category
  const recommendations = recommendationsByCategory[projectCategory] || [];

  return (
    <div className="w-1/4 bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold text-center text-[#1F2937]">
        Recommendations for {projectCategory} category
      </h4>
      <span className="text-gray-600 text-sm text-center block mt-1">
        Click the <Plus className="inline w-4 h-4" /> icon on a table to add all
        columns, or on a column to add just that one.
      </span>

      <ChevronDown
        className={"w-4 h-4 transition-transform transform rotate-180"}
      />

      <ul className="space-y-2 text-black">
        {recommendations.map((template) => (
          <li key={template.id} className="mb-2">
            <div className="flex justify-between items-center p-2 bg-white rounded shadow cursor-pointer">
              <span className="flex items-center">
                <Plus
                  className="w-4 h-4 mr-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggling the dropdown
                    addAllColumnsToTemplate(template); // Add all columns when clicked
                  }}
                />
                {template.name}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openedTemplateId === template.id ? "transform rotate-180" : ""
                }`}
                onClick={() => {
                  setOpenedTemplateId(
                    openedTemplateId === template.id ? null : template.id
                  );
                }}
              />
            </div>
            {openedTemplateId === template.id && (
              <ul className="space-y-1 px-1">
                {template.columns.map((column) => (
                  <li
                    key={column.id}
                    className="flex items-center bg-gray-100 p-1 rounded shadow cursor-pointer"
                    onClick={() => addColumnToTemplate(column)}>
                    <Plus className="w-4 h-4 mr-2" />{" "}
                    {/* Plus icon added here */}
                    <span>{column.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomizationSidebar;
