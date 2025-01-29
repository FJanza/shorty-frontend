import React, {useState} from "react";
import {Props} from "./types";
import {Cog, Copy, Eye, Lock, Trash} from "lucide-react";
import {toast} from "sonner";
import classNames from "classnames";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {DeleteShorty, EditShorty} from "@/services/ShortyService";
import {useAuth} from "../AuthProvider/Index";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";

const ShortyCard = ({
  url,
  slug,
  description,
  viewQuantity,
  onDelete,
  onUpdate,
}: Props) => {
  const user = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [urlAux, setUrlAux] = useState<{
    url: string;
    description: string;
  }>({url: "", description: ""});

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
  const handlerEdit = async (
    url: string,
    description: string,
    slug: string
  ) => {
    setEditLoading(true);
    EditShorty(user, url, slug, description)
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        onUpdate({
          url: url,
          description: description,
        });
        setEditLoading(false);
        setUrlAux({url: "", description: ""});
        toast.success("Shoorty edited");
      });
  };

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
  const hanlderSeeFullSlug = () => {
    if (urlLong) {
      console.log("slug");
    }
  };

  const disabledAddButton =
    urlAux.url === url && urlAux.description === description;

  return (
    <div
      className={classNames(
        "flex flex-col items-start gap-3 border-2 border-gray-600/30 p-4 rounded-md min-w-80 w-80 h-32",
        {"animate-pulse border-red-600/50": deleteLoading},
        {"animate-pulse border-cyan-600/60": editLoading}
      )}
    >
      <div className="flex justify-between w-full items-center">
        <h3
          className={classNames(
            "text-base text-white max-w-[15ch] text-ellipsis overflow-hidden whitespace-nowrap cursor-default"
            // {"hover:cursor-pointer hover:text-white/70": urlLong}
          )}
          onClick={hanlderSeeFullSlug}
        >
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Cog
                        size={20}
                        className="hover:text-white/80 cursor-pointer hover:rotate-180 transition-all duration-700"
                      />
                    </DialogTrigger>
                    <DialogContent
                      className="sm:max-w-[425px]"
                      aria-describedby={undefined}
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Shoorty</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-start gap-4 py-4 ">
                        <div className="flex items-center justify-start gap-4 w-full">
                          <Label className="font-bold w-32 text-start">
                            Url<span className="font-bold text-red-600">*</span>
                          </Label>
                          <Input
                            placeholder={url}
                            value={urlAux.url}
                            className="w-full"
                            onChange={(e) => {
                              setUrlAux((prev) => {
                                return {...prev, url: e.target.value};
                              });
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-start gap-4 relative w-full">
                          <Label className="font-bold w-32 text-start">
                            Slug
                          </Label>
                          <Input
                            value={slug}
                            className="w-full"
                            disabled={true}
                          />
                          <Tooltip>
                            <TooltipTrigger className="absolute right-3">
                              <Lock size={15} className="text-white/70 " />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                If you want to change the slug, delete it and
                                create a new one.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-start justify-start gap-4 w-full">
                          <Label className="font-bold w-32 text-start mt-3">
                            Description
                          </Label>
                          <Textarea
                            placeholder={
                              description.slice(0, 10) +
                              `${description.length > 10 ? "..." : ""}`
                            }
                            value={urlAux.description}
                            className="w-full"
                            onChange={(e) => {
                              setUrlAux((prev) => {
                                return {...prev, description: e.target.value};
                              });
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            disabled={disabledAddButton}
                            className="font-bold"
                            onClick={() =>
                              handlerEdit(urlAux.url, urlAux.description, slug)
                            }
                          >
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
            "text-base text-white max-w-[30ch] text-ellipsis overflow-hidden whitespace-nowrap cursor-default"
            // {"hover:cursor-pointer hover:text-white/70": urlLong}
          )}
          onClick={hanlderSeeFullUrl}
        >
          {url}
        </h3>
        <p
          className={classNames(
            "text-sm text-white/70 max-w-[30ch] text-ellipsis overflow-hidden whitespace-nowrap cursor-default"
            // {"hover:cursor-pointer hover:text-white/90": descriptionLong}
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
