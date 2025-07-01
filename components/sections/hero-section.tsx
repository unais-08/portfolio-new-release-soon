import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] flex items-center justify-center text-center p-4">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
          Shaikh Unais
        </h1>

        <p className="text-xl md:text-2xl text-primary font-medium">
          Full Stack Developer
        </p>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          I design and build modern web applications with a focus on user
          experience, performance, and scalability. Passionate about solving
          complex problems with elegant solutions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="#projects">
            <Button size="lg" className="px-8 py-3 text-lg">
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="#skills">
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              Explore Skills <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
