// app/not-found.tsx
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-16">
      <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-4 animate-in zoom-in-50 duration-500">
        404
      </h1>
      <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 animate-in fade-in-up delay-100 duration-500">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8 animate-in fade-in-up delay-200 duration-500">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" passHref>
        <Button
          size="lg"
          className="px-8 py-3 text-lg animate-in fade-in-up delay-300 duration-500"
        >
          <Home className="mr-2 h-5 w-5" /> Go to Homepage
        </Button>
      </Link>
    </div>
  );
}
