import React, {useState} from "react";
import {Props} from "./types";
import {Cog, Copy, Eye, Trash} from "lucide-react";
import {toast} from "sonner";
import classNames from "classnames";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {DeleteShorty} from "@/services/ShortyService";
import {useAuth} from "../AuthProvider/Index";

const ShortyCard = ({
  url,
  slug,
  description,
  viewQuantity,
  onDelete,
}: Props) => {
  const user = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const descriptionLong = description.split("").length > 30;
  const urlLong = url.split("").length > 30;

  const handlerCopyUrl = () => {
    navigator.clipboard.writeText("https://shoorty.onrender.com/" + slug);
    toast.success("URL copied to clipboard");
  };

  const handlerDelete = async () => {
    setDeleteLoading(true);
    DeleteShorty(user, slug)
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        onDelete();
        setDeleteLoading(false);
        toast.error("Shoorty deleted");
      });
  };

  const handlerEdit = () => {};

  const hanlderSeeFullDescription = () => {
    if (descriptionLong) {
      console.log("description");
    }
  };

  const hanlderSeeFullUrl = () => {
    if (urlLong) {
      console.log("url");
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-start gap-3 border-2 border-gray-600/30 p-4 rounded-md w-80 h-32",
        {"animate-pulse border-red-600/50": deleteLoading}
      )}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="cursor-default">
          /<span className="font-bold">{slug}</span>
        </h3>
        <div className="flex items-center gap-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center gap-1 cursor-default">
                  <Eye size={20} />
                  <h3>{viewQuantity}</h3>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of views</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex items-center gap-2 pl-2 ml-2 border-l-2 border-white/60">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Copy
                    size={20}
                    onClick={handlerCopyUrl}
                    className="hover:brightness-75 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy url to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Trash
                    size={20}
                    className="hover:text-red-700/80 cursor-pointer"
                    onClick={handlerDelete}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Shoorty</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Cog
                    size={20}
                    className="hover:text-white/80 cursor-pointer hover:rotate-180 transition-all duration-700"
                    onClick={handlerEdit}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Shoorty</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full items-start">
        <h3
          className={classNames(
            "text-base text-white max-w-[30ch] text-ellipsis overflow-hidden whitespace-nowrap cursor-default",
            {"hover:cursor-pointer hover:text-white/70": urlLong}
          )}
          onClick={hanlderSeeFullUrl}
        >
          {url}
        </h3>
        <p
          className={classNames(
            "text-sm text-white/70 max-w-[30ch] text-ellipsis overflow-hidden whitespace-nowrap cursor-default",
            {"hover:cursor-pointer hover:text-white/90": descriptionLong}
          )}
          onClick={hanlderSeeFullDescription}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShortyCard;
