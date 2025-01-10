"use client";

import {Button} from "@/components/ui/button";
import {googleSignIn} from "@/services/AuthService";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={googleSignIn}>Login with google</Button>
      <Button
        onClick={() => {
          console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
        }}
      >
        Local
      </Button>
    </div>
  );
}
