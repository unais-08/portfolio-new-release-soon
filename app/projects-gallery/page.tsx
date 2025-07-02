"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/projects/project-card";
import { FilterSidebar } from "@/components/projects/project-sidebar-filter";
import { Project } from "@/types/projects"; // Corrected import path based on your ProjectCard
import { Loader2, SlidersHorizontal } from "lucide-react"; // Added SlidersHorizontal for filter icon
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Ensure Button is imported

// Define the categories for the sidebar filter
const projectCategories = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile App Development",
  "Blockchain / Web3",
  "AI / Machine Learning",
  "Cloud & DevOps",
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // State for mobile sidebar
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "/api/projects";
      if (categoryFilter) {
        url += `?category=${encodeURIComponent(categoryFilter)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch projects");
      }
      const data: Project[] = await response.json();

      const parsedData = data.map((project) => ({
        ...project,
        tech_stack:
          typeof project.tech_stack === "string"
            ? JSON.parse(project.tech_stack)
            : project.tech_stack,
      }));

      setProjects(parsedData);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err.message || "An unknown error occurred.");
      toast.error("Failed to load projects", {
        description: err.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container py-16 md:py-10 mr-0 ml-0 flex flex-col md:flex-row gap-6">
      {/* Mobile filter button (visible only on small screens) */}
      <div className="md:hidden flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filter Projects
        </Button>
      </div>

      {/* Sidebar for Filters (uses Sheet for mobile, regular div for desktop) */}
      <FilterSidebar
        categories={projectCategories}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area for Projects */}
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-foreground">Loading projects...</span>
          </div>
        ) : error ? (
          <div className="text-center text-destructive-foreground p-4 bg-destructive rounded-md">
            <p>{error}</p>
            <Button onClick={fetchProjects} className="mt-4">
              Retry
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            <p>No projects found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
