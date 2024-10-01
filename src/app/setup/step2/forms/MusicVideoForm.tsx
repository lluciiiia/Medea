import React, { useState } from "react";

interface MusicVideoFormProps {
  videoLength: string;
  setVideoLength: (value: string) => void;
  numMainCharacters: number;
  setNumMainCharacters: (value: number) => void;
  numMainConcepts: number;
  setNumMainConcepts: (value: number) => void;
}

const MusicVideoForm: React.FC<MusicVideoFormProps> = ({
  videoLength,
  setVideoLength,
  numMainCharacters,
  setNumMainCharacters,
  numMainConcepts,
  setNumMainConcepts,
}) => {
  return (
    <>
      <div>
        {/* Video Length */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Length of Music Video
          </label>
          <input
            type="text"
            value={videoLength}
            onChange={(e) => setVideoLength(e.target.value)}
            placeholder="Enter the length of the music video"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Number of Main Characters */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Main Characters
          </label>
          <input
            type="number"
            value={numMainCharacters}
            onChange={(e) => setNumMainCharacters(Number(e.target.value))}
            placeholder="Enter number of main characters"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>

        {/* Number of Main Concepts */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Main Concepts
          </label>
          <input
            type="number"
            value={numMainConcepts}
            onChange={(e) => setNumMainConcepts(Number(e.target.value))}
            placeholder="Enter number of main concepts"
            className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
          />
        </div>
      </div>
    </>
  );
};

export default MusicVideoForm;
