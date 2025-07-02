"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"; // Changed import to sonner
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";

// Import UploadThing components (using UploadButton now)
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core"; // Adjust path based on your UploadThing setup

export default function AddProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [techStack, setTechStack] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number | string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // e: React.FormEvent is already the correct type
    e.preventDefault();

    if (!projectName || !description || !category) {
      toast.error("Missing Fields", {
        // Using sonner.error
        description: "Please fill in Project Name, Description, and Category.",
      });
      return;
    }

    setLoading(true);

    try {
      const projectData = {
        name: projectName,
        description: description,
        github_url: githubUrl || null,
        live_url: liveUrl || null,
        main_image_url: mainImageUrl,
        tech_stack: techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        category: category,
        featured: featured,
        display_order:
          typeof displayOrder === "number"
            ? displayOrder
            : displayOrder === ""
            ? null
            : Number(displayOrder),
      };

      console.log("Project Data to be submitted:", projectData);
      // In a real application, you would send this 'projectData' to your backend API here.
      // Example: await fetch('/api/projects', { method: 'POST', body: JSON.stringify(projectData) });

      // Simulate a delay for the "submission"
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Project Data Prepared!", {
        // Using sonner.success
        description: `"${projectName}" data is ready. You would send this to your backend.`,
      });

      // Clear form fields
      setProjectName("");
      setDescription("");
      setGithubUrl("");
      setLiveUrl("");
      setMainImageUrl(null);
      setTechStack("");
      setCategory("");
      setFeatured(false);
      setDisplayOrder("");
    } catch (error: any) {
      console.error("Error preparing project data:", error);
      toast.error("Error", {
        // Using sonner.error
        description: `There was an issue preparing your project data: ${
          error.message || "Unknown error"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 md:py-12 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
        Add New Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="projectName">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
          />
        </div>
        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="liveUrl">Live Demo URL</Label>
          <Input
            id="liveUrl"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </div>

        {/* UploadThing Integration with UploadButton */}
        <div>
          <Label htmlFor="mainImageUpload">Main Project Image</Label>

          <div className="mt-2 flex justify-center items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            {!mainImageUrl ? (
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    setMainImageUrl(res[0].ufsUrl);
                    toast.success("Image Uploaded!", {
                      // Using sonner.success
                      description:
                        "Your project image has been successfully uploaded.",
                    });
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error("Upload Error", {
                    // Using sonner.error
                    description: `Failed to upload image: ${error.message}`,
                  });
                }}
                className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:after:bg-primary"
              />
            ) : (
              <div> Image Uploaded</div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
          <Input
            id="techStack"
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g., React, Next.js, Tailwind CSS, MongoDB"
          />
        </div>
        <div>
          <Label htmlFor="category">
            Category <span className="text-red-500">*</span>
          </Label>
          <Input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g., Web Development, Mobile App, AI"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(!!checked)}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
        <div>
          <Label htmlFor="displayOrder">
            Display Order (optional, lower number appears first)
          </Label>
          <Input
            id="displayOrder"
            type="number"
            value={displayOrder}
            onChange={(e) =>
              setDisplayOrder(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            placeholder="e.g., 1, 2, 3..."
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing Data...
            </>
          ) : (
            "Add Project"
          )}
        </Button>
      </form>
    </div>
  );
}
