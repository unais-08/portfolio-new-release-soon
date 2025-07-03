"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Lightbulb,
  Code,
  Menu,
  X,
  FileText,
  FolderOpen,
} from "lucide-react";

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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand Name */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
            >
              Unais
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" icon={Home}>
              Home
            </NavLink>
            <NavLink href="/projects-gallery" icon={FolderOpen}>
              Projects
            </NavLink>
            <NavLink href="/#skills" icon={Lightbulb}>
              Skills
            </NavLink>
            <NavLink href="/#about" icon={Code}>
              About
            </NavLink>
          </div>

          {/* Right side: Socials, Resume, Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Desktop Social Links */}
            <div className="hidden lg:flex items-center space-x-3">
              <SocialLinks />
            </div>

            {/* Resume Button */}
            <Link
              href="/resume_social.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" className="font-medium">
                <FileText className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </Link>

            {/* Mobile Resume Icon */}
            <Link
              href="/resume_social.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden"
            >
              <Button variant="outline" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-b shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-3">
                  <NavLink href="/" icon={Home} onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                  <NavLink
                    href="/projects-gallery"
                    icon={FolderOpen}
                    onClick={closeMobileMenu}
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    href="/#skills"
                    icon={Lightbulb}
                    onClick={closeMobileMenu}
                  >
                    Skills
                  </NavLink>
                  <NavLink href="/#about" icon={Code} onClick={closeMobileMenu}>
                    About
                  </NavLink>
                </div>

                {/* Social Links Section */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Connect with me
                  </p>
                  <div className="flex space-x-4">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
