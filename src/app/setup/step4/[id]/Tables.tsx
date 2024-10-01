import { LoadingSpinner } from "@/app/assets/Loading";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ExportButtons from "./ExportButtons";

interface TablesProps {
  tables: string | null;
  references: string | null;
  loading: boolean;
}

const Tables: React.FC<TablesProps> = ({ tables, references, loading }) => {
  const tableElements = tables
    ? tables
        .split("<<NEXT_TABLE>>")
        .map((table, index) => (
          <div
            key={`table-${index}`}
            dangerouslySetInnerHTML={{ __html: table }}
          />
        ))
    : [];

  const referencesElements = references
    ? references
        .split("<<NEXT_TABLE>>")
        .map((reference, index) => (
          <div
            key={`reference-${index}`}
            dangerouslySetInnerHTML={{ __html: reference }}
          />
        ))
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < tableElements.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const exportToExcel = (htmlTable: string, filename: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlTable;
    const tableElement = tempDiv.querySelector("table");

    if (tableElement) {
      // Convert the table to a workbook
      const workbook = XLSX.utils.table_to_book(tableElement);

      // Make sure the filename ends with .xlsx
      const excelFilename = filename.endsWith(".xlsx")
        ? filename
        : `${filename}.xlsx`;

      // Write the file and trigger the download
      XLSX.writeFile(workbook, excelFilename);
    }
  };

  const handleExportAll = () => {
    if (tableElements.length > 0) {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Loop through all table elements and add them as separate sheets
      tableElements.forEach((te, index) => {
        const currentTableHtml = te.props.dangerouslySetInnerHTML.__html;

        // Create a temporary div to hold the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentTableHtml;

        // Find the table and the header <h2>
        const tableElement = tempDiv.querySelector("table");
        const headerElement = tempDiv.querySelector("h2");
        const tableName = headerElement
          ? headerElement.innerText
          : `Table_${index + 1}`;

        // If the table element exists, add it to the workbook
        if (tableElement) {
          const worksheet = XLSX.utils.table_to_sheet(tableElement);
          XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
        }
      });

      // Export the workbook with a meaningful filename
      XLSX.writeFile(workbook, "tables.xlsx");
    }
  };

  const handleExportCurrent = () => {
    if (tableElements[currentIndex]) {
      const currentTableHtml =
        tableElements[currentIndex].props.dangerouslySetInnerHTML.__html;

      // Extract the table name from the <h2> tag
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = currentTableHtml;
      const headerElement = tempDiv.querySelector("h2");
      const tableName = headerElement
        ? headerElement.innerText
        : `table_${currentIndex + 1}`;

      // Export the table with the extracted name as the filename
      exportToExcel(currentTableHtml, tableName);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex h-[600px] items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between items-center min-h-[500px] w-full">
            <ExportButtons
              handleExportAll={handleExportAll}
              handleExportCurrent={handleExportCurrent}
            />

            <div className="flex min-h-[350px] w-full">
              <div className="h-full w-[1000px]">
                {tableElements.length > 0 && (
                  <div className="flex-grow mb-4">
                    {tableElements[currentIndex]}
                  </div>
                )}
              </div>

              <div className="flex align-center ml-8 text-black h-[310px] w-[385px] text-base overflow-y-auto mt-[70px]">
                {referencesElements[currentIndex]}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handlePrevious}
                disabled={loading || currentIndex === 0}
                className="text-sm mx-2 px-3 py-2 border-2 border-gray-800 rounded-lg bg-transparent text-black hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={loading || currentIndex === tableElements.length - 1}
                className="text-sm mx-2 px-3 py-2 border-2 border-gray-800 rounded-lg bg-transparent text-black hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Tables;
