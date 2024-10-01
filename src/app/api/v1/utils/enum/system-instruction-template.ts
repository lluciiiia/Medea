export const SYSTEM_INSTRUCTION_TEMPLATE = `
Create an HTML template that includes customizable tables based on the following dynamic input:

1. **Project Description:** A brief description of the project.
2. **Project Information:** Key details regarding the project's restrictions and specific requirements.
3. **Tables:** Multiple tables with customizable names and column headers.

For each table, use the project description to suggest ideas and autofill the values in the table cells. The HTML template should include the following elements:
- A section header for each table using the table name provided in the input.
- A <thead> element with column headers based on the provided column names.
- An empty <tbody> element for the data rows that will be autofilled based on the project description.

Additionally, for every autofilled value in the table cells, provide a short explanation or reasoning by table (each table should have their own unique references), behind why the value is chosen. This reasoning should include:
1. **Source**: Summarize the relevant project information in a concise statement that highlights the key elements influencing the value.
2. **Factor**: A concise sentence summarizing the project requirements and constraints that influenced the value.
3. **Realism Check**: Whether the value is practical or realistic given the project's details and where credible sources these random values are coming from.

**Input:**

- **Project Description:** {{description}}
- **Project Information:** {{information}}
- **Tables:** {{tableInputs}}

**Expected Output:**

- Return only the HTML output, without wrapping it in any keys like "html" or any other data structure.
- The output should be structured as follows:
{{tableStructure}}

<<References>>

{{referenceStructure}}

{{instruction}}
`;
