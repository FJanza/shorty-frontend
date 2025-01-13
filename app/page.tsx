"use client";

import {useAuth} from "@/components/AuthProvider/Index";
import ProfileButton from "@/components/ProfileButton";
import {Button} from "@/components/ui/button";
import {Link2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  const [badge, setBadge] = useState<boolean>(false);

  const handlerCreateShorty = () => {
    if (!user) {
      toast.error(
        "You need to be logged in to create a Shorty.\n The login button is located at the top."
      );
      setBadge(true);
    } else {
      router.replace("/my-shortys");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <nav className="flex flex-row justify-between items-center w-full p-4 px-32">
        <h1 className="font-bold">Shorty</h1>
        <ProfileButton
          user={user}
          badge={badge}
          onClick={() => {
            setBadge(false);
          }}
        />
      </nav>

      <div className="flex flex-col pt-24 gap-6 h-full w-full">
        <div className="flex flex-col items-center justify-start text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Take Control of Your Links
          </h1>
          <h4 className="text-lg md:text-xl p-4">
            Shorty is a platform designed to help you create, manage, and share
            short links effortlessly. It's fast, reliable, and built for
            simplicity.
          </h4>
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="font-bold group transition-all"
            onClick={handlerCreateShorty}
          >
            <Link2 className="h-5 w-5 group-hover:-rotate-45 transition-all" />
            Create a Shorty
          </Button>
        </div>
      </div>
    </div>
  );
}
