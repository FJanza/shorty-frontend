"use client";

import {useAuth} from "@/components/AuthProvider/Index";
import ProfileButton from "@/components/ProfileButton";
import ReceiveInfoCard from "@/components/ReceiveInfoCard";
import {Button} from "@/components/ui/button";
import {getUserReceiveInfo} from "@/services/FirestoreService";
import {Link2, Siren} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {toast} from "sonner";

export const metadata = {
  title: "Home | Shoorty",
  description: "Shorten and manage your links with Shoorty efficiently.",
  openGraph: {
    url: "https://shoorty.com/",
    title: "Shoorty - Shorten your URLs easily",
    description: "Shorten and manage your links with Shoorty efficiently.",
    images: ["/screenshoot.webp"],
  },
  twitter: {
    title: "Shoorty - Shorten your URLs easily",
    description: "Shorten and manage your links with Shoorty efficiently.",
    images: ["/screenshoot.webp"],
  },
};

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  const [badge, setBadge] = useState<boolean>(false);
  const [showReceiveInfoPopUp, setShowReceiveInfoPopUp] = useState<
    boolean | undefined
  >(false);

  const handlerVerifyCreateShorty = () => {
    if (!user) {
      toast.error(
        "You need to be logged in to create a Shorty.\n The login button is located at the top."
      );
      setBadge(true);
    } else {
      router.push("/my-shortys");
    }
  };

  useEffect(() => {
    const ReceiveDataPopUp = async () => {
      if (user?.email) {
        const obj = await getUserReceiveInfo(user.email);

        if (obj) {
          setShowReceiveInfoPopUp(obj.receiveUserInfo);
        }
      }
    };

    ReceiveDataPopUp();
  }, [user?.email]);

  return (
    <div className="flex flex-col items-center justify-start h-screen relative">
      <nav className="flex flex-row justify-between items-center w-full p-4 px-32 border-b-2 border-gray-600/30">
        <a href="https://shoorty.vercel.app/" target="_self">
          <h1 className="font-bold">Shoorty</h1>
        </a>

        <ProfileButton
          user={user}
          badge={badge}
          onClick={() => {
            setBadge(false);
          }}
        />
      </nav>
      <div className="flex flex-col pt-24 gap-6 h-3/4 w-full  justify-center">
        <div className="flex flex-col items-center justify-start text-center px-4 gap-0">
          <h1 className="text-4xl md:text-6xl font-bold">
            Take Control of Your Links
          </h1>
          <h4 className="text-lg md:text-xl p-4">
            Shoorty is a platform designed to help you create, manage, and share
            short links effortlessly.
            <br></br>
            {"It's fast, reliable, and built for simplicity."}
          </h4>
          <a href="https://slug.vercel.app/" target="_self">
            <h1 className="hover:text-gray-600 transition-all group">
              Inspired by{" "}
              <span className="text-white/70 group-hover:text-gray-600 transition-all ">
                Slug
              </span>
            </h1>
          </a>
        </div>
        <div className="w-full flex justify-center gap-3">
          <Button
            className="font-bold group transition-all"
            onClick={() => {
              handlerVerifyCreateShorty();
            }}
          >
            <Link2 className="h-5 w-5 group-hover:-rotate-45 transition-all" />
            Create a Shoorty
          </Button>
          <a
            href="https://github.com/FJanza/shorty-frontend/issues"
            target="_blank"
          >
            <Button
              className="font-bold group transition-all"
              variant={"secondary"}
            >
              <Siren className="h-5 w-5 group-hover:animate-color-change " />I
              found an issue
            </Button>
          </a>
        </div>
      </div>
      <ReceiveInfoCard
        uid={user?.uid || ""}
        show={
          !(showReceiveInfoPopUp === false || showReceiveInfoPopUp === true) &&
          !!user
        }
      />
    </div>
  );
}
