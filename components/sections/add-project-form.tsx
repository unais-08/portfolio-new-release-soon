"use client";

import React from "react";
import { Loader2, Save, RotateCcw } from "lucide-react";

import { useProjectForm } from "@/hooks/useProjectFrom";

import { Button } from "@/components/ui/button";
import { ImageUploadSection } from "@/components/forms/ImageUploadSection";
import { FormField } from "@/components/forms/FormField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddProjectForm() {
  const { formData, loading, errors, updateField, submitProject, resetForm } =
    useProjectForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitProject();
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Add New Project
        </h1>
        <p className="text-muted-foreground">
          Showcase your latest work by adding it to your portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill in the information about your project. Required fields are
            marked with an asterisk (*).
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="projectName"
                label="Project Name"
                required
                value={formData.name}
                onChange={(value) => updateField("name", value)}
                error={errors.name}
                placeholder="Enter your project name"
              />

              <FormField
                id="category"
                label="Category"
                required
                value={formData.category}
                onChange={(value) => updateField("category", value)}
                error={errors.category}
                placeholder="e.g., Web Development, Mobile App, AI"
              />
            </div>

            <FormField
              id="description"
              label="Description"
              required
              type="textarea"
              value={formData.description}
              onChange={(value) => updateField("description", value)}
              error={errors.description}
              placeholder="Describe your project, its features, and what makes it special..."
              rows={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="githubUrl"
                label="GitHub URL"
                type="url"
                value={formData.github_url}
                onChange={(value) => updateField("github_url", value)}
                error={errors.github_url}
                placeholder="https://github.com/username/project"
              />

              <FormField
                id="liveUrl"
                label="Live Demo URL"
                type="url"
                value={formData.live_url}
                onChange={(value) => updateField("live_url", value)}
                error={errors.live_url}
                placeholder="https://your-project.com"
              />
            </div>

            <ImageUploadSection
              imageUrl={formData.main_image_url}
              onImageUpload={(url) => updateField("main_image_url", url)}
              onImageRemove={() => updateField("main_image_url", null)}
              error={errors.main_image_url}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="techStack"
                label="Tech Stack"
                required
                value={formData.tech_stack}
                onChange={(value) => updateField("tech_stack", value)}
                error={errors.tech_stack}
                placeholder="React, Next.js, Tailwind CSS, PostgreSQL"
              />

              {/* <FormField
                id="displayOrder"
                label="Display Order"
                type="number"
                value={formData.display_order}
                onChange={(value) =>
                  updateField(
                    "display_order",
                    value === "" ? "" : Number(value)
                  )
                }
                error={errors.display_order}
                placeholder="1, 2, 3... (lower numbers appear first)"
              /> */}
            </div>

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  updateField("featured", !!checked)
                }
              />
              <Label htmlFor="featured" className="text-sm font-medium">
                Featured Project
                <span className="block text-xs text-muted-foreground">
                  Featured projects are highlighted on your portfolio
                </span>
              </Label>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Add Project
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
                className="sm:w-auto w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
