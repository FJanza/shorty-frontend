import React, {useEffect, useState} from "react";
import {Props} from "./types";
import classNames from "classnames";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {Button} from "../ui/button";
import {setUserReceiveInfo} from "@/services/FirestoreService";
import {Clock12, Flame, Rocket} from "lucide-react";

const ReceiveInfoCard = ({show, uid}: Props) => {
  const [showCard, setShowCard] = useState<boolean>(show);

  useEffect(() => {
    setShowCard(show);
  }, [show]);

  const handleSetReceiveInfo = async (receiveInfo: boolean) => {
    setUserReceiveInfo(uid, receiveInfo).finally(() => {
      setShowCard(false);
    });
  };

  return (
    <Card
      className={classNames(
        "z-30 w-[380px] h-[220px] bg-black/50 backdrop-blur-sm absolute bottom-6 left-[calc(50%-190px)] animate-pulseBorder border-gray-600/30",
        {
          " hidden": !showCard,
        }
      )}
    >
      <CardHeader>
        <CardTitle>Message!</CardTitle>
        <CardDescription className="text-white">
          <p>
            Want to stay updated on the latest Shoorty features and
            improvements?
          </p>
          <p>{`We'll only email you when there's something really interesting to share no spam, just useful updates.`}</p>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-around">
        <Button
          variant="outline"
          className="font-bold group"
          onClick={() => {
            handleSetReceiveInfo(false);
          }}
        >
          Not now{" "}
          <div className="relative">
            <Clock12 className="h-2 w-2 group-hover:animate-spin" />
            <Clock12 className="h-2 w-2 absolute top-0 left-0" />
          </div>
        </Button>
        <Button
          className="font-bold group"
          onClick={() => {
            handleSetReceiveInfo(true);
          }}
        >
          Let’s go{" "}
          <div className="relative ">
            <Rocket className="h-2 w-2" />
            <Flame className="h-[1px] w-[1px] absolute -bottom-2 -left-2 rotate-[220deg] group-hover:text-red-600 group-hover:animate-pulse group-hover:fill-red-500 z-50 " />
            <Flame className="h-[1px] w-[1px] absolute -bottom-2 -left-2 rotate-[220deg]  fill-white text-white" />
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReceiveInfoCard;
