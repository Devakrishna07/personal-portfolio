"use client";

import React, { useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";
import {
  NavBrand,
  NavItem,
  HamburgerButton,
  MobileNavDrawer,
} from "@/components/navigation";
import { useScrollPosition } from "@/hooks/ui/useScrollPosition";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { shouldShowNavbar, isPastHero } = useScrollPosition(0.75);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-8 pointer-events-none transition-all duration-300 ease-in-out ${
          shouldShowNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Desktop & Tablet: Sleek centered frosted pill container */}
        <div className="hidden md:flex pointer-events-auto mx-auto w-full max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.12]">
          {/* Brand/Logo */}
          <NavBrand />

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* Mobile View (< md): Logo on left end, Hamburger circle on right end, no enclosing bar */}
        <div className="flex md:hidden w-full items-center justify-between pointer-events-none">
          <div className="pointer-events-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <NavBrand />
          </div>

          <div className="pointer-events-auto">
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer with Ultra-Frost Glass */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen && isPastHero}
        onClose={closeMobileMenu}
        items={NAV_ITEMS}
      />
    </>
  );
}
