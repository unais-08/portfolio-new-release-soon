import { useState } from "react";
import { toast } from "sonner";

import { ProjectFormData } from "@/types/projects";

import { ProjectAPI } from "@/lib/api/projects";
import { projectSchema } from "@/lib/validation";

export const useProjectForm = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    github_url: "",
    live_url: "",
    main_image_url: null,
    tech_stack: "",
    category: "",
    featured: false,
    display_order: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ProjectFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    try {
      const validationData = {
        ...formData,
        github_url: formData.github_url || undefined,
        live_url: formData.live_url || undefined,
      };

      projectSchema.parse(validationData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const submitProject = async () => {
    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return false;
    }

    setLoading(true);

    try {
      const projectData = {
        name: formData.name,
        description: formData.description,
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        main_image_url: formData.main_image_url,
        tech_stack: formData.tech_stack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        category: formData.category,
      };
      console.log(projectData);
      await ProjectAPI.createProject(projectData);

      toast.success("Project Created Successfully!", {
        description: `"${formData.name}" has been added to your portfolio.`,
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        github_url: "",
        live_url: "",
        main_image_url: null,
        tech_stack: "",
        category: "",
        featured: false,
        display_order: "",
      });

      return true;
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast.error("Failed to Create Project", {
        description: error.message || "An unexpected error occurred",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      github_url: "",
      live_url: "",
      main_image_url: null,
      tech_stack: "",
      category: "",
      featured: false,
      display_order: "",
    });
    setErrors({});
  };

  return {
    formData,
    loading,
    errors,
    updateField,
    submitProject,
    resetForm,
  };
};
