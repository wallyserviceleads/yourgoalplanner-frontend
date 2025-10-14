"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

type SiteNavigationProps = {
  links: NavLink[];
};

export function SiteNavigation({ links }: SiteNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="site-navigation">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="visually-hidden">
          {isOpen ? "Close navigation" : "Open navigation"}
        </span>
      </button>
      <nav
        id="primary-navigation"
        className={`site-nav${isOpen ? " open" : ""}`}
        aria-label="Main navigation"
      >
        <ul className="nav__list">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav__link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
