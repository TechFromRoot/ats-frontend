"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LinkIcon, SendHorizonal, Star } from "lucide-react";
import Image from "next/image";
import { cn, getTokenInfo } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import { ModifiedResponse } from "@/lib/utils";
import { LoadingState } from "@/components/loading";
import { Toaster, toast } from "sonner";
const FeaturedCoins = [
  {
    name: "Fartcoin",
    src: "/fartcoin.png",
    ca: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
  },
  {
    name: "OpenAI Agent",
    src: "/openai.png",
    ca: "46Ws3CkfBRjtGumCeH3pNrmpyxPmtJgqYpr7WDeaXXoo",
  },

  {
    name: "PENGU",
    src: "/pengu.png",
    ca: "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv",
  },
  {
    name: "swarms",
    src: "/swarms.png",
    ca: "74SBV4zDXxTRgv1pEMoECskKBkZHc2yGPnc7GYVepump",
  },
  {
    name: "ai16z",
    src: "/ai16z.png",
    ca: "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
  },
  {
    name: "ZEREBRO",
    src: "/ZEROBRO.png",
    ca: "8x5VqbHA8D7NkD52uNuS5nnt3PwA8pLD34ymskeSo2Wn",
  },
];

export default function ATS() {
  const [openSection, setOpenSection] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<
    { userMsg: string; botMsg: ModifiedResponse; timeStamp: Date }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [recentSearch, setRecentSearch] = useState<{ text: string }[]>([]);
  const handleMsg = async () => {
    if (isLoading) return;
    if (inputValue.trim() === "") {
      return;
    }

    setOpenSection(false);
    setIsLoading(true);

    const response = await getTokenInfo(inputValue);
    console.log("response", response);

    const newMessage = {
      userMsg: inputValue,
      botMsg: response,
      timeStamp: new Date(),
    };

    setRecentSearch((prev) => {
      return [
        {
          text: response?.tokenDetails?.tokenName,
          src: response?.socialsData?.imageUrl,
          ca: inputValue,
        },
        ...prev,
      ];
    });

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setIsLoading(false);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };
  const latestMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return (
    <div className="w-full relative lg:px-[42px] px-5 h-svh flex flex-col overflow-x-hidden">
      <Toaster richColors />
      <div className="bg-[#9559f526] w-1/2 h-full absolute md:-right-[5%] -right-[20%]  rounded-[1573px] blur-[310px] " />
      <Navbar recentSearch={recentSearch} openSection={openSection} />
      <AnimatePresence mode="wait">
        {openSection && (
          <motion.div
            key="featured-coins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex  md:items-center  mx-auto items-start mt-10   md:grow justify-center md:gap-2 gap-10 flex-col"
          >
            <div className="w-full md:flex hidden px-20 items-center justify-between md:scale-90">
              <button onClick={() => setInputValue(FeaturedCoins[0].ca)}>
                <Badge
                  text={FeaturedCoins[0].name}
                  src={FeaturedCoins[0].src}
                  className="w-[140px] ]"
                />
              </button>
              <button onClick={() => setInputValue(FeaturedCoins[1].ca)}>
                <Badge
                  text={FeaturedCoins[1].name}
                  src={FeaturedCoins[1].src}
                  className="w-[150px]"
                />
              </button>
            </div>
            <div className="relative ">
              <Image
                alt="hero"
                src="/center.png"
                width={700}
                height={254}
                className="object-cover relative"
              />
              <div className="w-full hidden md:flex justify-between items-center absolute  px-[20%] bottom-[20px]">
                <Image alt="zap" src={"/zap.png"} width={30} height={30} />

                <Image alt="zap" src={"/zap.png"} width={30} height={30} />
              </div>
            </div>
            <div className="w-full md:hidden flex relative items-center justify-between scale-90">
              <button onClick={() => setInputValue(FeaturedCoins[2].ca)}>
                <Badge
                  text={FeaturedCoins[2].name}
                  src={FeaturedCoins[2].src}
                  className="w-[140px]"
                />
              </button>
              <button onClick={() => setInputValue(FeaturedCoins[3].ca)}>
                <Badge
                  text={FeaturedCoins[3].name}
                  src={FeaturedCoins[3].src}
                  className="w-[140px]"
                />
              </button>
            </div>
            <div className="w-full md:absolute scale-90 mb-3 px-10 flex items-center md:justify-between justify-center">
              <button onClick={() => setInputValue(FeaturedCoins[4].ca)}>
                <Badge
                  text={FeaturedCoins[4].name}
                  src={FeaturedCoins[4].src}
                  className="w-[140px] hidden md:flex"
                />
              </button>
              <button onClick={() => setInputValue(FeaturedCoins[5].ca)}>
                <Badge
                  text={FeaturedCoins[5].name}
                  src={FeaturedCoins[5].src}
                  className="w-[140px]"
                />
              </button>
            </div>
            <div className="w-full flex md:px-20 mt-3 md:mt-0 items-center justify-between scale-90">
              <button onClick={() => setInputValue(FeaturedCoins[2].ca)}>
                <Badge
                  text={FeaturedCoins[2].name}
                  src={FeaturedCoins[2].src}
                  className="w-[140px]"
                />
              </button>
              <button onClick={() => setInputValue(FeaturedCoins[3].ca)}>
                <Badge
                  text={FeaturedCoins[3].name}
                  src={FeaturedCoins[3].src}
                  className="w-[140px]"
                />
              </button>
            </div>
            <div className=" min-[1340px]:flex w-full hidden gap-2 justify-center items-center mt-2">
              <div className="w-4 aspect-square rounded-full bg-white" />
              <div className="w-4 aspect-square rounded-full bg-white/60" />
              <div className="w-4 aspect-square rounded-full bg-white/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full  md:grid lg:grid-cols-8 md:grid-cols-4 relative grow overflow-hidden  place-content-center place-items-center   gap-2 mt-6">
        <Sidebar
          type="about"
          recentSearch={recentSearch}
          className={cn(
            "w-[187px] lg:w-[309px]  h-full hidden no-scrollbar opacity-0 transition-all duration-200 delay-1000 lg:relative col-span-2 max-h-[90%] lg:flex overflow-y-auto",
            !openSection && "hidden lg:flex opacity-100"
          )}
        />

        <div className="col-span-4  flex h-full   w-full relative overflow-y-auto   items-center no-scrollbar  flex-col  md:justify-between justify-start">
          {isLoading && <LoadingState />}

          <AnimatePresence>
            <motion.div
              key="message-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full overflow-y-auto no-scrollbar"
            >
              {messages.map((msg, index) => (
                <MsgContainer
                  ref={latestMsgRef}
                  key={index}
                  botMsg={msg.botMsg}
                  userMsg={msg.userMsg}
                  timeStamp={msg.timeStamp}
                  isLoading={isLoading}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className=" md:relative absolute   backdrop-blur-md  w-full z-30 min-h-20 md:px-2 flex bottom-0   lg:max-w-[800px] md:max-w-[600px] ">
            <Star
              className="absolute left-4 top-[35px] fill-[#FFCF21]"
              size={10}
              stroke="#FFCF21"
            />
            <Button
              onClick={handleMsg}
              size={"icon"}
              variant={"ghost"}
              disabled={inputValue.trim() === "" || isLoading}
              className="bg-white/20 w-10 right-2 md:right-4 absolute z-50 top-[20px] hover:bg-white/30 transition-colors duration-150   h-10 rounded-full"
            >
              <SendHorizonal className="w-5 h-5  fill-white" size={2} />
            </Button>

            <Input
              className=" p-2 pl-8 py-3 rounded-full mx-auto self-center relative bottom-0  bg-white/5 w-full  border border-white/5"
              placeholder="Paste Contract Address here"
              value={inputValue}
              readOnly={isLoading}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleMsg();
                }
              }}
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={handlePaste}
              className="bg-white/20 z-50 w-10 h-10 rounded-full backdrop-blur-3xl absolute hover:bg-white/30 transition-colors duration-150 right-12 md:right-16 top-[20px]"
            >
              <Image
                alt="paste"
                src="/paste.svg"
                width={30}
                height={30}
                className="w-[26px] h-[26px] "
              />
            </Button>
          </div>
        </div>

        <Sidebar
          type="roadmap"
          recentSearch={recentSearch}
          className={cn(
            "w-[187px] lg:w-[309px]  h-full hidden no-scrollbar opacity-0  transition-all duration-200  delay-500 lg:relative col-span-2 max-h-[90%] lg:flex overflow-y-auto",
            !openSection && " lg:flex opacity-100"
          )}
        />
      </div>
    </div>
  );
}
function MsgContainer({
  botMsg,
  userMsg,
  ref
}: {
  botMsg: ModifiedResponse;
  userMsg: string;
  timeStamp: Date;
  isLoading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("copied");
    });
  };

  const formatTokenAddress = (address: string): string => {
    if (address.length <= 10) {
      return `${address}`; // No need to shorten if the address is already short
    }

    const prefix = address.slice(0, 4); // First 4 characters
    const suffix = address.slice(-8); // Last 8 characters
    return `${prefix}....${suffix}`;
  };
  if (botMsg?.AIresponse === "") {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#FF91914D]/70 p-4 rounded-2xl my-4 border border-white/5 overflow-hidden"
      >
        <h2 className="font-bold text-xl my-2">Error:</h2>
        <span className="text-white/90 text-sm break-words leading-relaxed">
          <span>Error Cannot fetch Token</span>
        </span>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={ref}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col-reverse md:max-w-[90%] text-white mx-auto gap-6 md:px-4 py-6 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full flex gap-3 items-start"
      >
        <div className="flex-1 md:flex items-center relative md:gap-3 gap-5 justify-center">
          <div className="space-y-5">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
            >
              <span className="text-white/90 text-sm break-words leading-relaxed">
                <h2 className="font-bold text-xl my-2">Summary</h2>
                <Markdown>{`${(botMsg as any)?.AIresponse?.summary}`}</Markdown>
              </span>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="text-white/90 text-sm break-words leading-relaxed">
                <h2 className="font-bold text-xl my-2">Token Info</h2>
                <div className="flex flex-wrap gap-2">
                  <span>Name: {botMsg?.tokenDetails?.tokenName}</span>
                  <span>Symbol: {botMsg?.tokenDetails?.tokenSymbol}</span>

                  <span>Price: {botMsg?.tokenDetails?.price}</span>
                  <span>
                    TotalSupply: {botMsg?.tokenDetails?.totalSupply}
                    {(botMsg as any)?.AIresponse?.tokenInfo?.symbol}
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="text-white/90 text-sm break-words leading-relaxed">
                <h2 className="font-bold text-xl my-2">
                  Holders and Distribution:
                </h2>
                <ol className="text-[8px]">
                  {(botMsg as any)?.tokenDestribution
                    ?.sort((a: any, b: any) => b.percentage - a.percentage) // Sort in descending order
                    .map((holder: any, i: any) => (
                      <li
                        key={holder.address}
                        className="flex justify-between text-sm my-2 w-full"
                      >
                        <span className="hidden md:block">
                          <span className="mr-2">{i + 1}.</span>
                          {holder?.address}
                        </span>

                        <span className="md:hidden block">
                          <span className="mr-2">{i + 1}.</span>
                          {formatTokenAddress(holder?.address)}
                        </span>
                        <span>{holder?.percentage}%</span>
                      </li>
                    ))}
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FF91914D]/30 p-4 rounded-2xl border border-white/5 overflow-hidden"
            >
              <h2 className="font-bold text-xl my-2">Warning:</h2>
              <span className="text-white/90 text-sm break-words leading-relaxed">
                <Markdown>{`${(botMsg as any)?.AIresponse?.Warnings}`}</Markdown>
              </span>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                " p-4 rounded-2xl border border-white/5 overflow-hidden",
                (botMsg as any)?.isContractBundled
                  ? "bg-[#FF808014]/10"
                  : "bg-[#80FF8014]/10"
              )}
            >
              <h2 className="font-bold text-xl my-2">Bundling Status:</h2>
              {!(botMsg as any)?.isContractBundled ? (
                <span className="text-white/90 text-sm break-words leading-relaxed">
                  <Markdown>{`$${botMsg?.tokenDetails?.tokenSymbol} does not seem to be bundled 🟢🟢🟢🟢🟢`}</Markdown>
                </span>
              ) : (
                <span className="text-white/90 text-sm break-words leading-relaxed">
                  <Markdown>{`$${botMsg?.tokenDetails?.tokenSymbol} has been bundled 🔴🔴🔴🔴🔴`}</Markdown>
                </span>
              )}
            </motion.div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
            >
              <div className="text-white/90 text-sm break-words leading-relaxed">
                <h2 className="font-bold text-xl my-2">
                  Value and market capitalization:
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span>Price: {botMsg?.tokenDetails?.price}</span>
                  <span>Symbol: {botMsg?.tokenDetails?.tokenSymbol}</span>
                  <span>
                    Market Cap:
                    {botMsg?.tokenDetails?.marketCap}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          {!botMsg?.error && (
            <div className="flex gap-1 mt-2 relative -bottom-8 md:mt-0 md:flex-col pb-20 justify-center items-center">
              {/* <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150"
                )}
              >
                <Image src="/share.svg" alt="Share" width={16} height={16} />
              </Button> */}
              <Button
                size="icon"
                onClick={() => handleCopy(JSON.stringify(botMsg.AIresponse, null, 2))}
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150 "
                )}
              >
                <Image src={"/copy.svg"} alt={"copy"} width={16} height={16} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150  mr-2 md:mb-2 md:mr-0"
                )}
              >
                <a href={botMsg?.socialsData?.website} target="_blank">
                  <LinkIcon />
                </a>
              </Button>

              {[
                {
                  src: "/pump.svg",
                  alt: "pump",
                  href: botMsg?.socialsData?.pump,
                },

                {
                  src: "/x.svg",
                  alt: "X",
                  href: botMsg?.socialsData?.socials?.find(
                    (o) => o.type.toLowerCase() == "twitter" || o.type == "x"
                  )?.url,
                },
                {
                  src: "/dex-white.svg",
                  alt: "DEX",
                  href: botMsg?.socialsData?.dex,
                },
              ].map((icon, index) => (
                <motion.div
                  key={icon.alt}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5 + index * 0.1,
                  }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150 ",
                      index === 1 && " mr-2 md:mb-2 md:mr-0"
                    )}
                  >
                    <a href={icon?.href || ""} target="_blank">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={16}
                        height={16}
                      />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full  gap-3   flex items-center justify-center lg:justify-end"
      >
        {botMsg?.socialsData?.imageUrl && (
          <div className="w-[35px] lg:w-[55px] p-1 rounded-full aspect-square bg-white/25  flex items-center justify-center ">
            <Image
              alt="logo"
              src={botMsg?.socialsData?.imageUrl}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
        )}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-fit bg-white/5 p-4 rounded-s-full rounded-tr-full border border-white/5 overflow-hidden break-words max-w-full"
        >
          <span className="text-white/90 md:text-sm text-[10px]  break-words leading-relaxed">
            {userMsg}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}