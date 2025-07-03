"use client";

import React, { useState, useEffect } from "react";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";

import { Project } from "@/types/projects";

const projectCategories = [
  { id: "all", label: "All Projects", count: 15 },
  { id: "frontend", label: "Frontend", count: 5 },
  { id: "backend", label: "Backend", count: 10 },
  { id: "fullstack", label: "Full Stack", count: 10 },
  { id: "blockchain", label: "Blockchain/Web3", count: 0 },
  { id: "aiml", label: "AI/ML", count: 0 },
];

// Sidebar Component
type FilterSidebarProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
};

function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  className = "",
}: FilterSidebarProps) {
  return (
    <Card className={`${className} h-fit`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Filter Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
          {projectCategories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                >
                  {category.label}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = "/api/projects";
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch projects.");
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
      } catch (error: any) {
        console.error("Error fetching projects:", error);
        setError(error.message || "An unexpected error occurred.");
        toast.error("Unable to load projects.", {
          description: error.message || "Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsMobileSidebarOpen(false);
  };

  const selectedCategoryLabel =
    projectCategories.find((cat) => cat.id === selectedCategory)?.label ||
    "All Projects";

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet
            open={isMobileSidebarOpen}
            onOpenChange={setIsMobileSidebarOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 font-medium"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter Projects
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Projects</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  className="border-none shadow-none"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </aside>

          {/* Projects Grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 space-y-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/20"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-semibold text-foreground">
                    Loading projects...
                  </p>
                  <p className="text-muted-foreground">
                    Fetching the latest projects for you
                  </p>
                </div>
              </div>
            ) : error ? (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="space-y-4">
                    <div className="text-destructive">
                      <p className="text-lg font-semibold">
                        Unable to load projects
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {error}
                      </p>
                    </div>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      size="lg"
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : projects.length === 0 ? (
              <Card className="bg-muted/30">
                <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="space-y-4">
                    <div className="text-muted-foreground">
                      <p className="text-xl font-semibold">No projects found</p>
                      <p className="text-sm mt-2">
                        {selectedCategory === "all"
                          ? "There are no projects available at the moment."
                          : `No projects found in the ${selectedCategoryLabel} category.`}
                      </p>
                    </div>
                    {selectedCategory !== "all" && (
                      <Button
                        onClick={() => setSelectedCategory("all")}
                        variant="outline"
                        size="lg"
                        className="mt-6"
                      >
                        View All Projects
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                  {projects.map((project: Project) => (
                    <div key={project.id} className="group relative">
                      <div className="h-full min-h-[420px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                        <ProjectCard project={project} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Section (if needed) */}
                {projects.length >= 6 && (
                  <div className="flex justify-center pt-8">
                    <div className="text-center space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Showing {projects.length} projects
                      </p>
                      <div className="w-full max-w-md mx-auto border-t border-dashed border-muted-foreground/20"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
