import { Project } from "@/types/projects";

export class ProjectAPI {
  private static baseURL = "/api/projects";

  static async createProject(
    projectData: Omit<Project, "id" | "created_at" | "updated_at">
  ): Promise<Project> {
    const response = await fetch(this.baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  static async getProjects(): Promise<Project[]> {
    const response = await fetch(this.baseURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async updateProject(
    id: string,
    projectData: Partial<Project>
  ): Promise<Project> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  static async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
  }
}
