"use client";

import React, { useEffect, useState } from "react";
import { FiFilm, FiCamera, FiMusic } from "react-icons/fi";
import CategoryCard from "../components/CategoryCard";
import Button from "../components/Button";
import NavigationBar from "../components/NavigationBar";
import ProgressBar from "../components/ProgressBar";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { LoadingSpinner } from "@/app/assets/Loading";
import { getCategories } from "../../controllers/categories";

const Step1: React.FC = () => {
  const { user, loading } = useAuth();
  const [categories, setCategories] = useState<any[]>([]); // Predefined categories
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
  }, [user, loading, router]);

  // Fetch predefined categories using the controller
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(); // Fetch categories via controller
        setCategories(data); // Set categories from the controller response
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle Next button click
  const handleNext = async () => {
    if (selectedCategory) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("projectCategoryId", selectedCategory.id);
        sessionStorage.setItem("projectCategoryName", selectedCategory.name);
      }
      router.push("/setup/step2");
    } else {
      alert("Please select a category.");
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-white px-16 pt-4">
        <NavigationBar title="Project Setup" />
        <ProgressBar step={1} totalSteps={4} />
        {loading ? (
          <div className="flex h-[600px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="container mx-auto px-4 my-16">
              <h1 className="text-lg font-semibold text-center text-[#1F2937] mb-10">
                Choose your category
              </h1>

              {/* Predefined Categories Section */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      label={category.name}
                      icon={
                        category.name === "Film" ? (
                          <FiFilm />
                        ) : category.name === "Photography" ? (
                          <FiCamera />
                        ) : (
                          <FiMusic />
                        )
                      }
                      description={`Select a ${category.name} project template.`}
                      selected={selectedCategory?.id === category.id}
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="container mx-auto px-4 mt-10">
              <div className="flex justify-between">
                <Button
                  label="Back"
                  onClick={() => router.back()}
                  type="secondary"
                />
                <Button label="Next" onClick={handleNext} type="primary" />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default Step1;
