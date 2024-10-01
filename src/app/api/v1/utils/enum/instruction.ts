export const instruction = `
**Automatically populate each cell with values derived from the Project Information, 
ensuring they are realistic, credible, and feasible while adhering to all project requirements and restrictions. 
For instance, if a budget is specified and a corresponding column exists, calculate and display the appropriate value in the specified currency.
If applicable, localize the values (e.g., equipment providers, costs, locations) by considering the project's location and assumptions based on the project information.**

**Additionally, ensure that all generated cell values maintain a connected context throughout all the tables.**
**Generate 20 rows; 
if this is not feasible based on the Project Information, 
fill the remaining rows with "N/A" after populating the specified quantity, 
but only when that quantity is less than 20 and greater than 0. 
Otherwise, populate the cells with credible and reasonable values based on the project information.
**

**Return only the HTML without any non-requested additional formatting, JSON keys, or objects.**
**Ensure there are no newlines in the HTML output.**
**Make sure to wrap one header - one table as a class called table-container**
**Make sure to wrap table as a class called scrollable-table**
**Between every every table-container, include <<NEXT_TABLE>> as the separator, ensuring you do NOT use <<NEXT_TABLE>> after the final table**
**Generate the correct number of tables based on the provided input. If only one table is specified, generate only one table.
**Your response must start with <div class='table-container'> and end with </div>. After the whole table section, there should be <<References>> before it starts the reference sections.**
**Must NOT conclude the final table html structure with <<NEXT_TABLE>>, but use only <<References>> instead**
**Must NOT start the first table reference with <<NEXT_TABLE>>, but use only <<References>> instead**
**Between every reference, provide a <<NEXT_TABLE>> section that explains how each value was derived.**
**Ensure that each of th Source/Factor/Realism Check sections avoids listing multiple details and instead provides a coherent summary that connects the information meaningfully.**
**Each reference of each table MUST have unique references contents that differentiate from the others. **
**Between every table's reference section, include <<NEXT_TABLE>> as the separator in the same order as the given tables, ensuring you do NOT use <<NEXT_TABLE>> after the final reference, ensuring you do NOT use <<<NEXT_TABLE>>.**

Generate autofilled values for specific table columns based on the project category:
- Reference-related column: Provide a credible link (not just placeholders) in each cell, along with a brief description of its relevance to the project.
- Task-related column: Break down the project into detailed, single-step tasks (one task per cell). Assign team members by distributing the workload evenly, and feel free to assign multiple people to a single task if needed. Provide task descriptions with specific responsibilities and required resources.
- Budget-related column: Create a budget plan with real costs and credible providers (e.g., reputable online stores or service providers). Include relevant links and adjust for project duration (e.g., multiplying rental fees for multi-day Film projects). Scale the budget to fit the project's scope.
- Makeup-related: Describe makeup styles, aligned with the project concept, with detail on color palettes, techniques, and intended effects. Include a credible, professional reference link as an example.
- Equipment-related column: List the required equipment with descriptions and real-world prices, ensuring relevance to the project. Include links to providers where applicable.
- Location-related column: if applicable, after the context, give them an example like (e.g. Seoul National University) to localize the places with real existing place by considering the project's location and assumptions based on the project information.
`;
