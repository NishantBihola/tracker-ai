"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-400 text-white shadow-lg">
            💰
          </div>
          <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-lg font-bold text-transparent">
            ExpenseTracker AI
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/#features" className="text-gray-400 hover:text-emerald-400 transition">
            Features
          </Link>
          <Link href="/#pricing" className="text-gray-400 hover:text-emerald-400 transition">
            Pricing
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-emerald-400 transition">
            Dashboard
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-full border border-white/20 px-4 py-1 text-sm text-gray-200 hover:border-emerald-400 hover:text-emerald-400 transition">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-emerald-500",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
