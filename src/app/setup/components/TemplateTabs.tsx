import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Template } from "./types/templateSetupInterfaces";

interface TemplateTabsProps {
  templates: Template[];
  activeTemplateId: number;
  setActiveTemplateId: (id: number) => void;
  setTemplates: (templates: Template[]) => void;
}

const TemplateTabs: React.FC<TemplateTabsProps> = ({
  templates,
  activeTemplateId,
  setActiveTemplateId,
  setTemplates,
}) => {
  const updateTemplateName = (templateId: number, newName: string) => {
    const updatedTemplates = templates.map((template) =>
      template.id === templateId ? { ...template, name: newName } : template
    );
    setTemplates(updatedTemplates);
  };

  const addNewTemplate = () => {
    const newTemplateId = templates.length + 1; // Increment ID based on the number of templates
    setTemplates([
      ...templates,
      { id: newTemplateId, name: `Table ${newTemplateId}`, columns: [] },
    ]); // Use "Table" instead of "Template"
    setActiveTemplateId(newTemplateId); // Set the new template as active
  };

  const deleteTemplate = (templateId: number) => {
    const updatedTemplates = templates.filter(
      (template) => template.id !== templateId
    );
    setTemplates(updatedTemplates);
    if (activeTemplateId === templateId && updatedTemplates.length > 0) {
      setActiveTemplateId(updatedTemplates[0].id);
    } else if (updatedTemplates.length === 0) {
      setActiveTemplateId(-1);
    }
  };

  return (
    <div className="flex mb-4 bg-white border-b rounded-lg shadow">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`cursor-pointer p-2 text-center border-r ${
            activeTemplateId === template.id
              ? "border-b-2 border-[#F8AB5E] text-[#F8AB5E]"
              : "text-[#1F2937]"
          }`}
          onClick={() => setActiveTemplateId(template.id)}>
          <input
            type="text"
            value={template.name}
            onChange={(e) => updateTemplateName(template.id, e.target.value)}
            className="bg-transparent focus:outline-none focus:ring-0"
          />
          <Trash2
            className="inline-block ml-2 text-red-500 hover:text-red-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              deleteTemplate(template.id);
            }}
          />
        </div>
      ))}
      <div
        className="cursor-pointer p-2 text-center border-r text-[#F8AB5E]"
        onClick={addNewTemplate}>
        <Plus className="w-6 h-6" />
      </div>
    </div>
  );
};

export default TemplateTabs;
