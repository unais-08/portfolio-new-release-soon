"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import AddProjectForm from "@/components/sections/add-project-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadProjectsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Optional: remember login
  useEffect(() => {
    if (localStorage.getItem("admin-auth") === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    const secret = process.env.NEXT_PUBLIC_UPLOAD_SECRET;
    if (password === secret) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-sm w-full border rounded-lg shadow p-6 space-y-4">
          <h1 className="text-xl font-bold text-center">Admin Login</h1>
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            Unlock
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <AddProjectForm />
    </div>
  );
}
