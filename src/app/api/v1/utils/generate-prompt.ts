import { instruction } from "./enum/instruction";
import { referenceStructure } from "./enum/reference-structure";
import { SYSTEM_INSTRUCTION_TEMPLATE } from "./enum/system-instruction-template";
import { tableStructure } from "./enum/table-structure";

export const generatePrompt = (
  description: string,
  information: string,
  tables: Array<{ name: string; columns: string }>
) => {
  const tableInputs = tables
    .map((table) => {
      return `- **Table Name:** ${table.name}\n  - **Columns:** ${table.columns}`;
    })
    .join("\n");

  return SYSTEM_INSTRUCTION_TEMPLATE.replace("{{description}}", description)
    .replace("{{information}}", information)
    .replace("{{tableInputs}}", tableInputs)
    .replace("{{tableStructure}}", tableStructure)
    .replace("{{instruction}}", instruction)
    .replace("{{referenceStructure}}", referenceStructure);
};
