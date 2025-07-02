// components/FilterSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Import Sheet components
import { X } from "lucide-react"; // For close icon in Sheet

interface FilterSidebarProps {
  categories: string[];
  isMobileOpen?: boolean; // New prop to control mobile sheet visibility
  onMobileClose?: () => void; // New prop to close mobile sheet
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  isMobileOpen,
  onMobileClose,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category") || "All";

  const renderFilterButtons = () => (
    <div className="flex flex-col gap-1">
      {["All", ...categories].map((category) => {
        const isActive =
          currentCategory.toLowerCase() === category.toLowerCase();
        const newSearchParams = new URLSearchParams(searchParams.toString());

        if (category === "All") {
          newSearchParams.delete("category");
        } else {
          newSearchParams.set("category", category);
        }

        return (
          <Link
            key={category}
            href={`${pathname}?${newSearchParams.toString()}`}
            passHref
            onClick={onMobileClose} // Close sheet when a filter is clicked
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category}
            </Button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md screens and up) */}
      <aside className="hidden md:block w-56 flex-shrink-0 p-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Categories
        </h3>
        {renderFilterButtons()}
      </aside>

      {/* Mobile Sidebar (Sheet, visible on screens smaller than md) */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-64 p-4 flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mb-4">
            <SheetTitle className="text-lg font-semibold">
              Categories
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="md:hidden"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetHeader>
          {renderFilterButtons()}
        </SheetContent>
      </Sheet>
    </>
  );
};
