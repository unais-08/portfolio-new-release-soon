import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks: React.FC = () => {
  return (
    <>
      <Link
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <Button variant="ghost" size="icon">
          <Github className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <Button variant="ghost" size="icon">
          <Linkedin className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href="https://twitter.com/yourusername"
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
