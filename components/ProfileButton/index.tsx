import React from "react";
import {Props} from "./type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Avatar, AvatarFallback} from "../ui/avatar";
import {githubSignIn, googleSignIn, logOut} from "@/services/AuthService";
import {User} from "lucide-react";
import {useRouter} from "next/navigation";
import Google from "../icons/Google";
import Github from "../icons/Github";
import classNames from "classnames";

const ProfileButton = ({user, badge, onClick}: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu onOpenChange={onClick}>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <canvas
              className={classNames(
                "absolute -top-0 -right-0 bg-red-600 w-3 h-3 rounded-full animate-pulse",
                {
                  " hidden": !badge,
                }
              )}
            />
          </div>
          <h3 className="">{user?.displayName?.slice(0, 15)}</h3>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        {user ? (
          <>
            <DropdownMenuItem className="cursor-default  flex justify-center">
              {user.email}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer hover:brightness-105 flex justify-center"
              onClick={() => {
                router.push("/my-shortys");
              }}
            >
              My Shortys
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logOut();
                router.push("/");
              }}
              className="cursor-pointer hover:brightness-105 flex justify-center"
            >
              LogOut
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={async () => {
                await googleSignIn();
                // router.replace("/my-shortys");
              }}
              className="cursor-pointer hover:brightness-105 flex justify-center"
            >
              Login with <Google />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await githubSignIn();
                // router.replace("/my-shortys");
              }}
              className="cursor-pointer hover:brightness-105 flex justify-center"
            >
              Login with <Github />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
