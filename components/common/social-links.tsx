import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";

const SocialLinks: React.FC = () => {
  return (
    <>
      <Link
        href={process.env.GITHUB_URL || ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <Button variant="ghost" size="icon">
          <Github className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href={process.env.LINKEDIN_URL || ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <Button variant="ghost" size="icon">
          <Linkedin className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href={process.env.TWITTER_URL || ""}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter Profile"
      >
        <Button variant="ghost" size="icon">
          <Twitter className="h-5 w-5" />
        </Button>
      </Link>
    </>
  );
};
export default SocialLinks;
