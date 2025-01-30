"use client";
import {useAuth} from "@/components/AuthProvider/Index";
import FactoryLoader from "@/components/Loaders/Factory";
import ProfileButton from "@/components/ProfileButton";
import ShortyCard from "@/components/ShortyCard/Index";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {URL} from "@/Interfaces/Shorty";
import {generateSlug} from "@/lib/utils";
import {AddShorty, GetAllShortys} from "@/services/ShortyService";
import classNames from "classnames";
import {CircleHelp, LoaderCircle, PlusCircle, RefreshCcw} from "lucide-react";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";

const MyShortys = () => {
  const specialChars = /[!@#{}\[\]]/;

  const user = useAuth();
  const [Shortys, setShortys] = useState<URL[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const [urlAux, setUrlAux] = useState<{
    url: string;
    slug: string;
    description: string;
  }>({url: "", slug: "", description: ""});

  useEffect(() => {
    if (user) {
      const getShortys = async () => {
        GetAllShortys(user)
          .then((res) => {
            if (res) {
              setShortys(res);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      };
      getShortys();
    }
  }, []);

  const handlerAddShorty = async (
    url: string,
    slug: string,
    description: string
  ) => {
    setLoadingAdd(true);
    try {
      const result = await AddShorty(user, url, slug, description);

      console.log({result});

      if (result.error) {
        console.log(result.error);
      } else {
        setShortys((prev) => [...prev, result]);
      }
    } catch (error) {
      console.log({error});
      toast.error("Slug already in use");
    }
    setUrlAux({url: "", slug: "", description: ""});
    setLoadingAdd(false);
  };

  const disabledAddButton = urlAux.url === "" || urlAux.slug === "";

  return (
    <div className="flex flex-col gap-2">
      <nav className="flex flex-row justify-between items-center w-full p-4 px-32 border-b-2 border-gray-600/30">
        <a href="https://shoorty.vercel.app/" target="_self">
          <h1 className="font-bold">Shoorty</h1>
        </a>
        <ProfileButton user={user} badge={false} />
      </nav>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-3">
          <FactoryLoader />
          <h5 className="text-sm text-white/60">
            Sorry for the wait, we are bringing your shoortys
          </h5>
        </div>
      ) : (
        <div className="flex justify-start gap-3 h-[80vh] mt-3">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 px-32 w-full">
            <div className="col-span-1 row-span-5">
              <Dialog>
                <DialogTrigger asChild disabled>
                  <div className="relative  w-fit">
                    <Button
                      className={classNames("font-bold", {
                        "animate-pulse": loadingAdd,
                      })}
                    >
                      Add Shoorty{" "}
                      <PlusCircle size={20} className=" text-black" />
                    </Button>

                    <LoaderCircle
                      size={20}
                      className={classNames(
                        "absolute -top-2 -right-2 animate-spin text-white ",
                        {
                          " hidden": !loadingAdd,
                        }
                      )}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  className={"sm:max-w-[425px]"}
                  aria-describedby={undefined}
                >
                  <DialogHeader>
                    <DialogTitle>Add Shoorty</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-start gap-4 py-4">
                    <div className="flex items-center justify-start gap-4 w-full">
                      <Label className="font-bold w-32 text-start">
                        Url<span className="font-bold text-red-600">*</span>
                      </Label>
                      <Input
                        value={urlAux.url}
                        className="w-full"
                        onChange={(e) => {
                          setUrlAux((prev) => {
                            return {...prev, url: e.target.value};
                          });
                        }}
                      />
                    </div>
                    <div className="relative flex items-center justify-start gap-4 w-full">
                      <Label className="font-bold w-32 text-start flex flex-row justify-start gap-1 items-center">
                        Slug<span className="font-bold text-red-600">*</span>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleHelp className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {urlAux.slug == "" ? "Example" : "Preview"}:
                                shoorty.onrender.com/
                                <span className="animate-color-change-rainbow">
                                  {urlAux.slug || "slug"}
                                </span>
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>

                      <Input
                        value={urlAux.slug.replaceAll(" ", "-")}
                        className="w-full"
                        onChange={(e) => {
                          const newSlug = e.target.value;
                          if (newSlug.includes(" ")) {
                            setUrlAux((prev) => {
                              return {
                                ...prev,
                                slug: newSlug.replaceAll(" ", "-"),
                              };
                            });
                          }
                          if (
                            !newSlug.includes("/") &&
                            !specialChars.test(newSlug)
                          ) {
                            setUrlAux((prev) => {
                              return {...prev, slug: newSlug};
                            });
                          } else {
                            if (specialChars.test(newSlug)) {
                              toast.error(
                                `Slug cannot contain special characters like !@#{}[]`
                              );
                            } else {
                              toast.error(`Slug cannot contain slashes`);
                            }
                          }
                        }}
                      />
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger className="absolute right-2 top-2 hover:bg-white/10 rounded-sm w-6 h-6 flex justify-center items-center">
                            <RefreshCcw
                              className="h-4 w-4"
                              onClick={() => {
                                setUrlAux((prev) => {
                                  return {...prev, slug: generateSlug(18)};
                                });
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate random slug</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-start justify-start gap-4 w-full">
                      <Label className="font-bold w-32 text-start mt-3">
                        Description
                      </Label>
                      <Textarea
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
                          handlerAddShorty(
                            urlAux.url,
                            urlAux.slug,
                            urlAux.description
                          )
                        }
                      >
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {Shortys.length < 1 ? (
              <div className="col-span-4 row-span-5 flex flex-row justify-center">
                <h4 className="text-xl font-semibold text-white/70 animate-pulse">
                  Try adding a new shoorty
                </h4>
              </div>
            ) : (
              <div className="col-span-4 row-span-5 ">
                <div className="flex flex-row flex-wrap gap-3 ">
                  {Shortys.map((shorty, i) => {
                    return (
                      <ShortyCard
                        key={`shorty-${i}`}
                        description={shorty.description}
                        slug={shorty.slug}
                        url={shorty.url}
                        viewQuantity={shorty.viewQuantity}
                        onDelete={() => {
                          setShortys((prev) =>
                            prev.filter((_, index) => index !== i)
                          );
                        }}
                        onUpdate={(newShorty) => {
                          setShortys((prev) =>
                            prev.map((prevShorty, index) =>
                              index === i
                                ? {...shorty, ...newShorty}
                                : prevShorty
                            )
                          );
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyShortys;
