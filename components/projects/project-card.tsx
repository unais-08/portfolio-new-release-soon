// components/ProjectCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/projects"; // Assuming your Project type path is correct

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const placeholderImage = `https://placehold.co/600x400/E0E0E0/333333?text=${encodeURIComponent(
    project.name
  )}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ease-in-out">
      {/* Project Image */}
      <CardHeader className="p-0 relative h-48 w-full overflow-hidden">
        <Image
          src={project.main_image_url || placeholderImage}
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
            e.currentTarget.srcset = "";
          }}
        />
        {/* Featured Badge */}
      </CardHeader>

      {/* Project Content */}
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl font-semibold mb-2 text-foreground">
          {project.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      {/* Project Links (GitHub, Live Demo) */}
      <CardFooter className="flex justify-start gap-2 p-4 pt-0">
        {project.github_url && (
          <Link
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </Link>
        )}
        {project.live_url && (
          <Link
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
