"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Lightbulb, Code, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import NavLink from "@/components/common/navlinks";
import SocialLinks from "@/components/common/social-links";
import { ThemeToggle } from "@/components/common/themeToggleButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Brand Name */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Unais
          </Link>
          <Link href="/upload-project" className="text-xl font-bold">
            Create Projects
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/" icon={Home}>
            Home
          </NavLink>
          <NavLink href="/projects-gallery" icon={Home}>
            Project Gallery
          </NavLink>
          <NavLink href="#skills" icon={Lightbulb}>
            Skills
          </NavLink>
          <NavLink href="#projects" icon={Code}>
            Projects
          </NavLink>
        </div>

        {/* Right side: Socials, Resume, Theme Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
            {/* Hide social links on very small screens */}
            <SocialLinks />
          </div>
          <Link
            href="/resume_social.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" className="hidden sm:inline-flex">
              Resume
            </Button>
            {/* Hide resume button on very small screens */}
            <Button variant="default" size="icon" className="sm:hidden">
              {/* Show icon-only resume on very small screens */}
              <Code className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeToggle />

          {/* Mobile Menu Button (Hamburger/X icon) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-card/90 backdrop-blur-sm border-b shadow-lg animate-in slide-in-from-top-8 duration-300">
          <div className="flex flex-col p-4 space-y-2">
            <NavLink href="/" icon={Home} onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink href="#skills" icon={Lightbulb} onClick={closeMobileMenu}>
              Skills
            </NavLink>
            <NavLink href="#projects" icon={Code} onClick={closeMobileMenu}>
              Projects
            </NavLink>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border mt-4">
              <p className="text-muted-foreground text-sm px-2">Connect:</p>
              <div className="flex space-x-4 px-2">
                <SocialLinks />
              </div>
            </div>
            {/* You can add the Resume button here for mobile if desired, or keep it in the main header */}
          </div>
        </div>
      )}
    </nav>
  );
}
