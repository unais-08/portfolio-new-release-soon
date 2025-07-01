import React from "react";

import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaDatabase,
  FaCode, // For Languages category
  FaGlobe, // For Web & Frameworks category
  FaTools, // For Tools & Platforms category
} from "react-icons/fa"; // Font Awesome icons
import {
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiSocketdotio,
  SiTailwindcss,
  SiAppwrite,
  SiCloudinary,
  SiCplusplus, // Specific icon for C++
  SiC, // Specific icon for C
} from "react-icons/si"; // Simple Icons

// Define a type for skill categories and individual skills
export interface SkillType {
  name: string;
  icon: React.ElementType; // Use React.ElementType for React Icons
  color: string; // Add a color property for each skill icon
}

export interface SkillCategoryType {
  category: string;
  icon: React.ElementType; // Icon for the category title
  skills: SkillType[];
}

// Define your skill categories with specific icons and colors
export const skillCategories: SkillCategoryType[] = [
  {
    category: "Languages",
    icon: FaCode, // Category icon from react-icons/fa
    skills: [
      { name: "C", icon: SiC, color: "text-blue-500" }, // Changed to SiC
      { name: "C++", icon: SiCplusplus, color: "text-indigo-500" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "SQL", icon: FaDatabase, color: "text-gray-500" },
    ],
  },
  {
    category: "Web & Frameworks",
    icon: FaGlobe, // Category icon from react-icons/fa
    skills: [
      { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS", icon: FaCss3Alt, color: "text-blue-400" },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-black dark:text-white",
      },
      { name: "React.js", icon: FaReact, color: "text-cyan-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-gray-700 dark:text-gray-300",
      },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
      { name: "Socket.io", icon: SiSocketdotio, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-500" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: FaTools, // Category icon from react-icons/fa
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      {
        name: "GitHub",
        icon: FaGithub,
        color: "text-gray-800 dark:text-gray-200",
      },
      { name: "AWS (EC2, S3)", icon: FaAws, color: "text-orange-400" },
      { name: "Appwrite", icon: SiAppwrite, color: "text-red-500" },
      { name: "Cloudinary", icon: SiCloudinary, color: "text-blue-700" },
    ],
  },
];
