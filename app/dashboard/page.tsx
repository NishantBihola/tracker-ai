"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </>
  );
}
