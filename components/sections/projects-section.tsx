"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/utils/featured-projects";

// ImageWrapper component to handle fallback
function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 hover:scale-105"
      onError={() =>
        setImgSrc(
          "https://placehold.co/600x400/1e293b/cbd5e1?text=Project+Image"
        )
      }
    />
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Here are some of my recent projects. Swipe through to explore, or
          visit the projects page to see more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full">
            <CardHeader className="relative h-48 w-full overflow-hidden rounded-t-xl">
              <ImageWithFallback src={project.image} alt={project.title} />
            </CardHeader>

            <CardContent className="flex-grow pt-4">
              <CardTitle className="text-xl font-semibold mb-2">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-4">
                {project.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-background hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
