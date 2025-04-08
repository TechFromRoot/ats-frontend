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
      {type === "roadmap" && recentSearch?.[0]?.ca && (
        <RiskCard contractAddress={recentSearch[0].ca} />
      )}
    </motion.div>
  );
}

export const About = () => {
  return (
    <div className="flex relative flex-col gap-4 w-full min-w-[286px] px-[16px] py-[10px] text-white rounded-md bg-[#1B1F27] items-center justify-center">
      <h2 className="text-[#D6FF00] text-[18px] md:text-[22px] font-inter font-bold text-center">
        About ATS
      </h2>
      <p className="text-[14px] font-inter leading-[16.9px] text-center">
        ATS delivers real-time insights for Solana tokens simply by pasting the token address.
        <div className="mb-1"></div>
        Gain access to price data, market cap, holder stats, and risk scores, all in real time to inform your decisions.
      </p>
      <div className="h-[74px] relative w-full">
        <Image src="/side.png" alt="ATS Logo" fill className="object-cover" />
      </div>
    </div>
  );
};

type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk";

interface RiskData {
  score: number; // from 0 to 10
  riskScore: RiskLevel;
}

export const RiskCard: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const colour =
    riskData?.riskScore === "Low Risk"
      ? "#00F5A0"
      : riskData?.riskScore === "Medium Risk"
        ? "#FFA500"
        : "#FF4D4D";

  useEffect(() => {
    if (!contractAddress) return;

    const fetchRiskData = async () => {
      try {
        const res = await fetch(`https://api.webacy.com/contracts/${contractAddress}`, {
          headers: {
            "x-api-key": "fIn7KhmIoRaGqKgFGDEDX8iamINbYVrP6Kzce91e", // replace this with your actual key
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data: RiskData = await res.json();
        setRiskData(data);
      } catch (error) {
        console.error("Failed to fetch risk data:", error);
      }
    };

    fetchRiskData();
  }, []);

  return (
    <div className="flex relative flex-col gap-4 w-full px-[16px] min-w-[286px] text-white py-[10px] rounded-md bg-[#1B1F27]">
      {riskData && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-1 mb-8">
            <span
              className="font-semibold text-xl"
              style={{ color: colour }}
            >
              {riskData.riskScore}
            </span>
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: colour }}
            ></span>
            <span className="text-xl text-white/70 ml-2">
              (Score: {riskData.score}/10)
            </span>
          </div>

          <div className="relative w-full h-2 rounded-full bg-white/10 mt-1">
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full"
              style={{
                left: `${(riskData.score / 10) * 100}%`,
                backgroundColor: colour,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-auto">
        <div className="w-[80px] h-[50px]">
          <Image
            src="/DD-xyz_Color_Transparent.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
};