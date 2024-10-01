import { Template } from "./templateSetupInterfaces";

export const PhotographyRecommendations: Template[] = [
  {
    id: 1,
    name: "Crew List",
    columns: [
      { id: "no", content: "No" },
      { id: "name", content: "Name" },
      { id: "role", content: "Role" },
      { id: "email", content: "Email" },
      { id: "phone", content: "Phone" },
    ],
  },
  {
    id: 2,
    name: "Task Allocation",
    columns: [
      { id: "task", content: "Task" },
      { id: "description", content: "Description" },
      { id: "pic", content: "PIC" }, // Person in Charge
      { id: "deadline", content: "Deadline" },
      { id: "working-link", content: "Working Link" },
      { id: "status", content: "Status" },
    ],
  },
  {
    id: 3,
    name: "Shotlist + Storyboard (Photo)",
    columns: [
      { id: "type", content: "Type" },
      { id: "scene", content: "Scene" },
      { id: "script", content: "Script" },
      { id: "note", content: "Note" },
      { id: "storyboard-size", content: "Storyboard (Size)" },
      { id: "angle", content: "Angle" },
      { id: "location", content: "Location" },
      { id: "outfit", content: "Outfit" },
      { id: "ref", content: "Ref" },
    ],
  },
  {
    id: 4,
    name: "Location",
    columns: [
      { id: "no", content: "No" },
      { id: "location", content: "Location" },
      { id: "scout", content: "Scout" },
      { id: "note", content: "Note" },
    ],
  },
  {
    id: 5,
    name: "Model + Outfit, Makeup",
    columns: [
      { id: "no", content: "No" },
      { id: "cast", content: "Cast" },
      { id: "props", content: "Props" },
      { id: "quantity", content: "Quantity" },
      { id: "pic", content: "PIC" },
      { id: "status", content: "Status" },
    ],
  },
  {
    id: 6,
    name: "Equipment",
    columns: [
      { id: "gear", content: "Gear" },
      { id: "type", content: "Type" },
      { id: "pic", content: "PIC" },
      { id: "quantity", content: "Quantity" },
      { id: "note", content: "Note" },
    ],
  },
  {
    id: 7,
    name: "Budget Plan",
    columns: [
      { id: "no", content: "No" },
      { id: "prop-name", content: "Prop to Buy" },
      { id: "description", content: "Description" },
      { id: "provider", content: "Provider" },
      { id: "amount", content: "Amount (Currency)" },
    ],
  },
];

export const MusicVideoRecommendations: Template[] = [
  {
    id: 1,
    name: "Crew List",
    columns: [
      { id: "no", content: "No" },
      { id: "name", content: "Name" },
      { id: "role", content: "Role" },
      { id: "email", content: "Email" },
      { id: "phone", content: "Phone" },
    ],
  },
  {
    id: 2,
    name: "Task Allocation",
    columns: [
      { id: "task", content: "Task" },
      { id: "description", content: "Description" },
      { id: "pic", content: "PIC" }, // Person in Charge
      { id: "deadline", content: "Deadline" },
      { id: "working-link", content: "Working Link" },
      { id: "status", content: "Status" },
    ],
  },
  {
    id: 3,
    name: "Shotlist + Storyboard (Music Video)",
    columns: [
      { id: "type", content: "Type" },
      { id: "scene", content: "Scene" },
      { id: "script", content: "Script" },
      { id: "note", content: "Note" },
      { id: "storyboard-size", content: "Storyboard (Size)" },
      { id: "angle", content: "Angle" },
      { id: "location", content: "Location" },
      { id: "outfit", content: "Outfit" },
      { id: "ref", content: "Ref" },
    ],
  },
  {
    id: 4,
    name: "Location",
    columns: [
      { id: "no", content: "No" },
      { id: "location", content: "Location" },
      { id: "scout", content: "Scout" },
      { id: "note", content: "Note" },
    ],
  },
  {
    id: 5,
    name: "Model + Outfit, Makeup",
    columns: [
      { id: "no", content: "No" },
      { id: "cast", content: "Cast" },
      { id: "outfit", content: "Outfit" },
      { id: "makeup", content: "Makeup" },
      { id: "quantity", content: "Quantity" },
      { id: "pic", content: "PIC" },
      { id: "status", content: "Status" },
    ],
  },
  {
    id: 6,
    name: "Equipment",
    columns: [
      { id: "gear", content: "Gear" },
      { id: "type", content: "Type" },
      { id: "pic", content: "PIC" },
      { id: "quantity", content: "Quantity" },
      { id: "note", content: "Note" },
    ],
  },
  {
    id: 7,
    name: "Budget Plan",
    columns: [
      { id: "no", content: "No" },
      { id: "item-name", content: "Item to Buy" },
      { id: "description", content: "Description" },
      { id: "provider", content: "Provider" },
      { id: "amount", content: "Amount (Currency)" },
    ],
  },
];

export const FilmRecommendations: Template[] = [
  {
    id: 1, // Changed to 1 for a unique ID
    name: "Crew List",
    columns: [
      { id: "no", content: "No" },
      { id: "name", content: "Name" },
      { id: "role", content: "Role" },
      { id: "email", content: "Email" },
      { id: "phone", content: "Phone" },
      { id: "date", content: "Date" },
    ],
  },
  {
    id: 2,
    name: "Schedule",
    columns: [
      { id: "deadline", content: "Deadline" },
      { id: "task", content: "Task" },
      { id: "crew-member", content: "Crew Member" },
      { id: "notes", content: "Notes" },
    ],
  },
  {
    id: 3,
    name: "Budget Plan",
    columns: [
      { id: "no", content: "No" },
      { id: "prop-name", content: "Prop to Buy" },
      { id: "description", content: "Description" },
      { id: "provider", content: "Provider" },
      { id: "amount", content: "Amount (Currency)" },
    ],
  },
];
