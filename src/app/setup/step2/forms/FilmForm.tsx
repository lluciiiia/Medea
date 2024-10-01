import React from "react";

interface FilmFormProps {
  filmTopic: string;
  setFilmTopic: (value: string) => void;
  numMainCharacters: number;
  setNumMainCharacters: (value: number) => void;
  numConcepts: number;
  setNumConcepts: (value: number) => void;
  charactersDescription: string;
  setCharactersDescription: (value: string) => void;
  shootingStartDate: Date | null;
  setShootingStartDate: (value: Date | null) => void;
  shootingDuration: number;
  setShootingDuration: (value: number) => void;
  shootingPlace: string;
  setShootingPlace: (value: string) => void;
}

const FilmForm: React.FC<FilmFormProps> = ({
  filmTopic,
  setFilmTopic,
  numMainCharacters,
  setNumMainCharacters,
  numConcepts,
  setNumConcepts,
  charactersDescription,
  setCharactersDescription,
  shootingStartDate,
  setShootingStartDate,
  shootingDuration,
  setShootingDuration,
  shootingPlace,
  setShootingPlace,
}) => {
  return (
    <div>
      {/* Film Topic */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Film Topic</label>
        <input
          type="text"
          value={filmTopic}
          onChange={(e) => setFilmTopic(e.target.value)}
          placeholder="Enter film topic"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Number of Main Characters */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Number of Main Characters</label>
        <input
          type="number"
          value={numMainCharacters}
          onChange={(e) => setNumMainCharacters(Number(e.target.value))}
          placeholder="Enter number of main characters"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Number of Concepts */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Number of Concepts</label>
        <input
          type="number"
          value={numConcepts}
          onChange={(e) => setNumConcepts(Number(e.target.value))}
          placeholder="Enter number of concepts"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Characters Description */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Characters Description</label>
        <input
          type="text"
          value={charactersDescription}
          onChange={(e) => setCharactersDescription(e.target.value)}
          placeholder="Enter Character Description"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Shooting Start Date */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Shooting Start Date</label>
        <input
          type="date"
          value={shootingStartDate ? shootingStartDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setShootingStartDate(new Date(e.target.value))}
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Shooting Duration */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Shooting Duration (in days)</label>
        <input
          type="number"
          value={shootingDuration}
          onChange={(e) => setShootingDuration(Number(e.target.value))}
          placeholder="Enter shooting duration in days"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>

      {/* Shooting Place */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Shooting Place</label>
        <input
          type="text"
          value={shootingPlace}
          onChange={(e) => setShootingPlace(e.target.value)}
          placeholder="Enter shooting place"
          className="w-full p-4 border border-gray-300 rounded-md text-lg text-black"
        />
      </div>
    </div>
  );
};

export default FilmForm;
