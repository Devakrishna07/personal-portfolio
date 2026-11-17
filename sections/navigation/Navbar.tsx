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
  // Activates only after scrolling past 75% of the viewport (past the hero)
  const { isPastHero } = useScrollPosition(0.75);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full px-3 py-3 sm:px-6 sm:py-4 lg:px-8 pointer-events-none transition-all duration-300 ease-in-out ${
          isPastHero
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]">
          {/* Brand/Logo */}
          <NavBrand />

          {/* Desktop & Tablet Navigation Links (hidden on small phones) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* Mobile Hamburger Toggle (hidden on desktop & tablet) */}
          <div className="md:hidden">
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
