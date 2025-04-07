"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Sidebar({
  className,
  recentSearch,
  isLoading,
  type,
}: {
  className?: string;
  recentSearch?: any[];
  isLoading?: boolean;
  type?: "about" | "roadmap";
}) {
  const [visibleBadges, setVisibleBadges] = useState(0);

  useEffect(() => {
    const calculateBadges = () => {
      const screenHeight = window.innerHeight;
      const badgeHeight = 43 + 12;
      const count = Math.floor(screenHeight / badgeHeight);
      setVisibleBadges(count);
    };

    calculateBadges();
    window.addEventListener("resize", calculateBadges);

    return () => window.removeEventListener("resize", calculateBadges);
  }, []);
  console.log(recentSearch);
  const modifyRecentSearch =
    (recentSearch ?? []).length > visibleBadges
      ? recentSearch?.slice(0, visibleBadges)
      : recentSearch;
  return (
    <motion.div
      className={cn("flex font-inter flex-col gap-3 w-full", className)}
    >
      {/* {Array.from({ length: visibleBadges - 2 }).map((_, index) => (
        <Badge
          isLoading={isLoading}
          key={index}
          text={modifyRecentSearch?.[index]?.text}
          src={modifyRecentSearch?.[index]?.src}
        />
      ))} */}
      {type === "about" && <About />}
      {type === "roadmap" && <RoadMap />}
    </motion.div>
  );
}

export const About = () => {
  return (
    <div className="flex relative flex-col gap-4 w-full min-w-[286px] px-[16px] py-[10px]  text-white rounded-md bg-[#1B1F27]">
      <h2 className="text-[#D6FF00] text-[18px] md:text-[22px] font-inter font-bold">
        About ATS
      </h2>
      <p className="text-[14px] font-inter leading-[16.9px]">
        ATS is an agent that is powered by OpenAI & dexscreener to provide
        efficiency to traders on the Solana block-chain, allowing users to
        receive real-time insight to streamline their trading experience.
      </p>
      <div className="h-[74px] relative w-full">
        <Image src="/side.png" alt="ATS Logo" fill className="object-cover" />
      </div>
    </div>
  );
};

export const RoadMap = () => {
  return (
    <div className="flex relative flex-col gap-4 w-full px-[16px] min-w-[286px]  text-white py-[10px] rounded-md bg-[#1B1F27]">
      <h2 className="text-[#D6FF00] text-[18px] md:text-[22px] font-inter font-bold">
        Roadmap
      </h2>
      <p className="text-[14px] font-inter leading-[16.9px]">
        We will launch our $ATS token, the developer wallet will hold 5% of
        supply which will be locked for 1 year with weekly unlocks of a small %
        to fund team salaries and funding for API's. We will take in community
        feedback and push to release a v2 with additional community suggested
        features. We will also continue to do weekly updates to provide the most
        enhanced research for users.
      </p>
      {/* <div className="h-[74px] relative w-full">
        <Image src="/side.png" alt="ATS Logo" fill className="object-cover" />
      </div> */}
    </div>
  );
};
