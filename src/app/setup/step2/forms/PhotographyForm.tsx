import React, { useState } from "react";

interface PhotographyFormProps {
  photoshootTopic: string;
  setPhotoshootTopic: (value: string) => void;
  numSets: number;
  setNumSets: (value: number) => void;
  numConcepts: number;
  setNumConcepts: (value: number) => void;
  numModels: number;
  setNumModels: (value: number) => void;
}

const PhotographyForm: React.FC<PhotographyFormProps> = ({
  photoshootTopic,
  setPhotoshootTopic,
  numSets,
  setNumSets,
  numConcepts,
  setNumConcepts,
  numModels,
  setNumModels,
}) => {
  return (
    <>
      <div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Photoshoot Topic
          </label>
          <input
            type="text"
            value={photoshootTopic}
            onChange={(e) => setPhotoshootTopic(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
            placeholder="Enter photoshoot topic"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Sets
          </label>
          <input
            type="number"
            value={numSets}
            onChange={(e) => setNumSets(parseInt(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
            placeholder="Enter number of sets"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Concepts
          </label>
          <input
            type="number"
            value={numConcepts}
            onChange={(e) => setNumConcepts(parseInt(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
            placeholder="Enter number of concepts"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Models
          </label>
          <input
            type="number"
            value={numModels}
            onChange={(e) => setNumModels(parseInt(e.target.value))}
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
            placeholder="Enter number of models"
          />
        </div>
      </div>
    </>
  );
};

export default PhotographyForm;
