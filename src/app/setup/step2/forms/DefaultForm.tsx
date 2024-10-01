import React from "react";

interface DefaultFormProps {
  projectName: string;
  setProjectName: (value: string) => void;
  productionDate: Date | null;
  setProductionDate: (value: Date | null) => void;
  projectDescription: string;
  setProjectDescription: (value: string) => void;
  budget: number;
  setBudget: (value: number) => void;
  currency: string;
  setCurrency: (value: string) => void;
  inclusion: string;
  setInclusion: (value: string) => void;
  exclusion: string;
  setExclusion: (value: string) => void;
  onsetDay: Date | null;
  setOnsetDay: (value: Date | null) => void;
  numCrew: number;
  setNumCrew: (value: number) => void;
}

const DefaultForm: React.FC<DefaultFormProps> = ({
  projectName,
  setProjectName,
  productionDate,
  setProductionDate,
  projectDescription,
  setProjectDescription,
  budget,
  setBudget,
  currency,
  setCurrency,
  inclusion,
  setInclusion,
  exclusion,
  setExclusion,
  onsetDay,
  setOnsetDay,
  numCrew,
  setNumCrew,
}) => {
  return (
    <div className="flex gap-8 mr-8">
      <div>
        {/* Project Name */}
        <div className="mb-6">
          <label
            htmlFor="projectName"
            className="block text-gray-700 font-semibold mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name (e.g. Sunset Documentary)"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Production Date */}
        <div className="mb-6">
          <label
            htmlFor="productionDate"
            className="block text-gray-700 font-semibold mb-2">
            Production Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="productionDate"
              value={
                productionDate ? productionDate.toISOString().split("T")[0] : ""
              }
              onChange={(e) => setProductionDate(new Date(e.target.value))}
              className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
            />
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-6">
          <label
            htmlFor="projectDescription"
            className="block text-gray-700 font-semibold mb-2">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Briefly describe your project goals and scope"
            className="w-full p-4 border border-gray-300 rounded-md h-32 resize-none text-lg text-black"
          />
        </div>

        {/* Budget */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Budget
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            placeholder="Enter budget"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>
      </div>

      <div>
        {/* Currency */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Currency
          </label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="Enter currency (e.g. USD)"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Inclusion for Budget */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Inclusion for Budget
          </label>
          <input
            type="text"
            value={inclusion}
            onChange={(e) => setInclusion(e.target.value)}
            placeholder="Enter what's included in the budget"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Exclusion for Budget */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Exclusion for Budget
          </label>
          <input
            type="text"
            value={exclusion}
            onChange={(e) => setExclusion(e.target.value)}
            placeholder="Enter what's excluded from the budget"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Onset Day */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Onset Day
          </label>
          <input
            type="date"
            value={onsetDay ? onsetDay.toISOString().split("T")[0] : ""}
            onChange={(e) => setOnsetDay(new Date(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Number of Crew */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Crew Members
          </label>
          <input
            type="number"
            value={numCrew}
            onChange={(e) => setNumCrew(Number(e.target.value))}
            placeholder="Enter number of crew members"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultForm;
