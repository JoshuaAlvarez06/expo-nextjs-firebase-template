"use client";

import { useRouter } from "next/navigation";

import { Button } from "@acme/ui/button";

import { useAuth } from "~/hooks";
import { auth } from "~/lib/firebase";

export function AuthShowcase() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <Button
          onClick={() => {
            router.push("/login");
          }}
          size="lg"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {user && <span>Logged in as {user.phoneNumber}</span>}
      </p>

      <Button
        size="lg"
        onClick={async () => {
          await auth.signOut();
          window.location.reload();
        }}
        variant="secondary"
      >
        Sign out
      </Button>
    </div>
  );
}
