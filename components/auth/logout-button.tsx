"use client";

import { SignOutButton } from "@clerk/nextjs";
import Button from "../button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <SignOutButton signOutCallback={() => router.push("/")}>
      <Button small>Sign out</Button>
    </SignOutButton>
  );
};

export default LogoutButton;
