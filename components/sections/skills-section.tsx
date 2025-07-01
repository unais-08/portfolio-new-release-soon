import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillType, skillCategories } from "@/utils/skills-data";

export function SkillsSection() {
  return (
    <section id="skills" className="container py-16 md:py-24">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
          A curated set of tools and technologies I leverage to build robust,
          scalable, and highly interactive web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((categoryData) => (
          <Card
            key={categoryData.category}
            className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-semibold flex items-center gap-3 text-foreground">
                <categoryData.icon className="h-7 w-7 text-primary" />
                {/* Category icon */}
                {categoryData.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-6 gap-x-4">
              {/* Adjusted for better spacing */}
              {categoryData.skills.map((skill: SkillType) => (
                <div
                  key={skill.name}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors duration-200"
                >
                  <skill.icon
                    className={`h-6 w-6 ${skill.color} flex-shrink-0`}
                  />
                  {/* Apply specific color*/}
                  <span className="text-lg font-medium  whitespace-nowrap  text-foreground">
                    {skill.name}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
