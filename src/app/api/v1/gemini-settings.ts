import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const model = "gemini-1.5-flash";
export const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
export const genAI = new GoogleGenerativeAI(API_KEY || "");

export const generationConfig = {
  temperature: 0.7,
  topP: 0.85,
  topK: 50,
  maxOutputTokens: 80000,
  responseMimeType: "application/json",
};

export const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export const genModel = genAI.getGenerativeModel({
  model,
  generationConfig,
  safetySettings,
});
