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
import {URL} from "@/Interfaces/Shorty";
import {AddShorty, GetAllShortys} from "@/services/ShortyService";
import classNames from "classnames";
import {LoaderCircle, PlusCircle} from "lucide-react";
import React, {useEffect, useState} from "react";
import {toast} from "sonner";

const MyShortys = () => {
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
            setShortys(res);
          })
          .finally(() => {
            setLoading(false);
            console.log("first");
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
        <div className="flex justify-start gap-3 ">
          <div className="grid grid-cols-5 grid-rows-5 gap-4 px-32">
            <div className="row-span-5">
              <div className="relative">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={classNames("font-bold", {
                        "animate-pulse": loadingAdd,
                      })}
                    >
                      Add Shoorty{" "}
                      <PlusCircle size={20} className=" text-black" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[425px]"
                    aria-describedby={undefined}
                  >
                    <DialogHeader>
                      <DialogTitle>Add Shoorty</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-start gap-4 py-4">
                      <div className="flex items-center justify-start gap-4">
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
                      <div className="flex items-center justify-start gap-4">
                        <Label className="font-bold w-32 text-start">
                          Slug<span className="font-bold text-red-600">*</span>
                        </Label>
                        <Input
                          value={urlAux.slug}
                          className="w-full"
                          onChange={(e) => {
                            setUrlAux((prev) => {
                              return {...prev, slug: e.target.value};
                            });
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-start gap-4">
                        <Label className="font-bold w-32 text-start">
                          Description
                        </Label>
                        <Input
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
                <div
                  className={classNames(
                    "absolute -top-2 -right-2 animate-spin ",
                    {
                      " hidden": !loadingAdd,
                    }
                  )}
                >
                  <LoaderCircle size={20} className="text-white" />
                </div>
              </div>
            </div>
            <div className="col-span-4 row-span-5 flex flex-row justify-end ">
              <div className="flex flex-row flex-wrap gap-3">
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
                            index === i ? {...shorty, ...newShorty} : prevShorty
                          )
                        );
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyShortys;
