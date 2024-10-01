"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../components/ProgressBar";
import NavigationBar from "../components/NavigationBar";
import Button from "../components/Button";
import { useAuth } from "../../../hooks/useAuth";
import { LoadingSpinner } from "@/app/assets/Loading";
import PhotographyForm from "./forms/PhotographyForm";
import MusicVideoForm from "./forms/MusicVideoForm";
import FilmForm from "./forms/FilmForm";
import DefaultForm from "./forms/DefaultForm";

const Step2: React.FC = () => {
  const { user, loading } = useAuth();
  const [projectName, setProjectName] = useState<string>("");
  const [productionDate, setProductionDate] = useState<Date | null>(null);
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectCategoryName, setProjectCategoryName] = useState<string | null>(
    typeof window !== "undefined"
      ? sessionStorage.getItem("projectCategoryName")
      : null
  );

  // Photography form state
  const [photoshootTopic, setPhotoshootTopic] = useState<string>("");
  const [numSets, setNumSets] = useState<number>(0);
  const [numConcepts, setNumConcepts] = useState<number>(0);
  const [numModels, setNumModels] = useState<number>(0);

  // Music video form state
  const [videoLength, setVideoLength] = useState<string>("");
  const [numMainCharacters, setNumMainCharacters] = useState<number>(0);
  const [numMainConcepts, setNumMainConcepts] = useState<number>(0);

  // Film form state
  const [filmTopic, setFilmTopic] = useState<string>("");
  const [charactersDescription, setCharactersDescription] =
    useState<string>(""); // State for charactersDescription
  const [shootingStartDate, setShootingStartDate] = useState<Date | null>(null);
  const [shootingDuration, setShootingDuration] = useState<number>(0);
  const [shootingPlace, setShootingPlace] = useState<string>("");

  // Shared state for all forms
  const [budget, setBudget] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [inclusion, setInclusion] = useState<string>("");
  const [exclusion, setExclusion] = useState<string>("");
  const [onsetDay, setOnsetDay] = useState<Date | null>(null);
  const [numCrew, setNumCrew] = useState<number>(0);

  const router = useRouter();

  // Redirect to the login page if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login page if user is not authenticated
    }
  }, [user, loading, router]);

  const handleNext = () => {
    // Ensure sessionStorage is accessed only on the client side
    if (typeof window !== "undefined") {
      const projectCategoryId = sessionStorage.getItem("projectCategoryId");

      if (!projectCategoryId) {
        alert("Category ID is missing. Please go back and select a category.");
        return;
      }

      if (projectName && productionDate && projectDescription) {
        sessionStorage.setItem("projectName", projectName);
        sessionStorage.setItem("productionDate", productionDate.toISOString());
        sessionStorage.setItem("projectDescription", projectDescription);

        // Store all the form values in sessionStorage
        sessionStorage.setItem("photoshootTopic", photoshootTopic);
        sessionStorage.setItem("numSets", numSets.toString());
        sessionStorage.setItem("numConcepts", numConcepts.toString());
        sessionStorage.setItem("numModels", numModels.toString());

        sessionStorage.setItem("videoLength", videoLength);
        sessionStorage.setItem(
          "numMainCharacters",
          numMainCharacters.toString()
        );
        sessionStorage.setItem("numMainConcepts", numMainConcepts.toString());

        sessionStorage.setItem("filmTopic", filmTopic);
        sessionStorage.setItem("charactersDescription", charactersDescription);
        sessionStorage.setItem(
          "shootingStartDate",
          shootingStartDate ? shootingStartDate.toISOString() : ""
        );
        sessionStorage.setItem("shootingDuration", shootingDuration.toString());
        sessionStorage.setItem("shootingPlace", shootingPlace);

        sessionStorage.setItem("budget", budget.toString());
        sessionStorage.setItem("currency", currency);
        sessionStorage.setItem("inclusion", inclusion);
        sessionStorage.setItem("exclusion", exclusion);
        sessionStorage.setItem(
          "onsetDay",
          onsetDay ? onsetDay.toISOString() : ""
        );
        sessionStorage.setItem("numCrew", numCrew.toString());

        router.push("/setup/step3");
      } else {
        alert("Please fill out all fields.");
      }
    }
  };

  const renderCategoryForm = () => {
    switch (projectCategoryName) {
      case "Photography":
        return (
          <PhotographyForm
            photoshootTopic={photoshootTopic}
            setPhotoshootTopic={setPhotoshootTopic}
            numSets={numSets}
            setNumSets={setNumSets}
            numConcepts={numConcepts}
            setNumConcepts={setNumConcepts}
            numModels={numModels}
            setNumModels={setNumModels}
          />
        );
      case "Music Video":
        return (
          <MusicVideoForm
            videoLength={videoLength}
            setVideoLength={setVideoLength}
            numMainCharacters={numMainCharacters}
            setNumMainCharacters={setNumMainCharacters}
            numMainConcepts={numMainConcepts}
            setNumMainConcepts={setNumMainConcepts}
          />
        );
      case "Film":
        return (
          <FilmForm
            filmTopic={filmTopic}
            setFilmTopic={setFilmTopic}
            numMainCharacters={numMainCharacters}
            setNumMainCharacters={setNumMainCharacters}
            numConcepts={numConcepts}
            setNumConcepts={setNumConcepts}
            charactersDescription={charactersDescription}
            setCharactersDescription={setCharactersDescription}
            shootingStartDate={shootingStartDate}
            setShootingStartDate={setShootingStartDate}
            shootingDuration={shootingDuration}
            setShootingDuration={setShootingDuration}
            shootingPlace={shootingPlace}
            setShootingPlace={setShootingPlace}
          />
        );
      default:
        return null;
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-white px-16 py-4">
        <NavigationBar title="Project Setup" />
        <ProgressBar step={2} totalSteps={4} />
        {loading ? (
          <div className="flex h-[600px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4 mt-0">
              <h2 className="text-lg font-semibold text-center text-[#1F2937] my-8">
                Input Project Details
              </h2>

              <div className="max-w">
                <div className="flex maw-w-lg justify-center">
                  <DefaultForm
                    projectName={projectName}
                    setProjectName={setProjectName}
                    productionDate={productionDate}
                    setProductionDate={setProductionDate}
                    projectDescription={projectDescription}
                    setProjectDescription={setProjectDescription}
                    budget={budget}
                    setBudget={setBudget}
                    currency={currency}
                    setCurrency={setCurrency}
                    inclusion={inclusion}
                    setInclusion={setInclusion}
                    exclusion={exclusion}
                    setExclusion={setExclusion}
                    onsetDay={onsetDay}
                    setOnsetDay={setOnsetDay}
                    numCrew={numCrew}
                    setNumCrew={setNumCrew}
                  />
                  {renderCategoryForm()}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    label="Back"
                    onClick={() => router.back()}
                    type="secondary"
                  />
                  <Button label="Next" onClick={handleNext} type="primary" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default Step2;
