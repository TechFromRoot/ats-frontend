"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, Star } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedCoins = [
  {
    name: "Fartcoin",
    src: "/bitcoin.svg",
  },
  {
    name: "Bonk",
    src: "/ethereum.svg",
  },
  {
    name: "Binance Coin",
    src: "/binance.svg",
  },
  {
    name: "PENGU",
    src: "/cardano.svg",
  },
  {
    name: "swarms",
    src: "/solana.svg",
  },
  {
    name: "ai162",
    src: "/tether.svg",
  },
  {
    name: "ZEREBRO",
    src: "/ripple.svg",
  },
];

export default function Home() {
  const [openSection, setOpenSection] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<
    { userMsg: string; botMsg: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [recentSearch, setRecentSearch] = useState<{ text: string }[]>([]);
  const handleMsg = async () => {
    if (isLoading) return;
    if (inputValue.trim() === "") {
      // toast({
      //   title: "Error",
      //   description: "Please paste a token address",
      //   variant: "destructive",
      // });
      return;
    }
    setRecentSearch((prev) => {
      return [{ text: "Zerobro", src: "/ZEROBRO.png" }, ...prev];
    });

    setOpenSection(false);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newMessage = {
      userMsg: inputValue,
      botMsg:
        "Thena Network (THENA) is an open-source blockchain platform designed to provide developers with tools to create, grow, and enhance their projects and infrastructure.CoinAlpha Launched on January 2, 2025, on the Solana blockchain, the token's contract address is 5ZxotRXB6edrdVXUCC8Ed7RF2FvZAqd1s6c1SW34pump.Top 100 Token As of January 3, 2025, THENA is trading at approximately $0.001797, with a market capitalization of around $1.8 million and liquidity of $212,381",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setIsLoading(false);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full relative lg:px-[42px] px-5 h-svh flex flex-col overflow-x-hidden">
      <div className="bg-[#9559f526] w-1/2 h-full absolute md:-right-[5%] -right-[20%]  rounded-[1573px] blur-[310px] " />
      <Navbar recentSearch={recentSearch} />
      <div className="w-full  md:grid lg:grid-cols-6 md:grid-cols-4 relative grow overflow-hidden  gap-2 mt-6">
        <Sidebar
          recentSearch={recentSearch}
          className={cn(
            "absolute  w-[187px] lg:w-[209px] h-full lg:relative max-h-[90%] lg:flex overflow-y-auto",
            !openSection && "hidden lg:flex"
          )}
        />

        <div className="col-span-4  flex h-full    w-full relative overflow-y-auto   items-center no-scrollbar  flex-col  md:justify-between justify-start">
          <AnimatePresence mode="wait">
            {openSection ? (
              <motion.div
                key="featured-coins"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex  md:items-center items-start  md:grow justify-center md:gap-2 gap-10 flex-col"
              >
                <div className="w-full md:flex hidden px-10 items-center justify-between md:scale-90">
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px] ]"
                  />
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px]"
                  />
                </div>
                <div className="relative">
                  <Image
                    alt="hero"
                    src="/center.png"
                    width={700}
                    height={254}
                    className="object-contain relative md:w-[450px] md:h-[230px] "
                  />
                  <div className="w-full hidden md:flex justify-between items-center absolute  px-[20%] bottom-[20px]">
                    <Image alt="zap" src={"/zap.png"} width={30} height={30} />

                    <Image alt="zap" src={"/zap.png"} width={30} height={30} />
                  </div>
                </div>
                <div className="w-full md:hidden flex  relative items-center justify-between scale-90">
                  <Button variant={"ghost"}>
                    <Badge
                      text="Zerobro"
                      src="/ZEROBRO.png"
                      className="w-[140px] mt-[60px] relative"
                    />
                  </Button>
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px]"
                  />
                </div>
                <div className="w-full md:absolute mb-3 flex items-center md:justify-between justify-center">
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px] hidden md:flex"
                  />
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px]"
                  />
                </div>
                <div className="w-full flex md:px-10 mt-3 md:mt-0 items-center justify-between">
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px]"
                  />
                  <Badge
                    text="Zerobro"
                    src="/ZEROBRO.png"
                    className="w-[140px]"
                  />
                </div>
                <div className=" md:flex w-full hidden gap-2 justify-center items-center mt-2">
                  <div className="w-4 aspect-square rounded-full bg-white " />
                  <div className="w-4 aspect-square rounded-full bg-white " />
                  <div className="w-4 aspect-square rounded-full bg-white " />
                </div>
              </motion.div>
            ) : (
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
                    key={index}
                    botMsg={msg.botMsg}
                    userMsg={msg.userMsg}
                  />
                ))}
                <div ref={bottomRef} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className=" md:relative absolute bottom-4 w-full  lg:max-w-[800px] md:max-w-[600px] ">
            <Star
              className="absolute left-4 top-[17px] fill-[#FFCF21]"
              size={10}
              stroke="#FFCF21"
            />
            <Button
              onClick={handleMsg}
              size={"icon"}
              variant={"ghost"}
              disabled={inputValue.trim() === "" || isLoading}
              className="bg-white/20 w-10 right-2 absolute top-[4px] hover:bg-white/30 transition-colors duration-150   h-10 rounded-full"
            >
              <SendHorizonal className="w-5 h-5  fill-white" size={2} />
            </Button>

            <Input
              className=" p-2 pl-8 py-3 rounded-full mx-auto self-center  bg-white/5 w-full  border border-white/5"
              placeholder="Paste Contract Address here"
              value={inputValue}
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
              className="bg-white/20 w-10 h-10 rounded-full backdrop-blur-3xl absolute hover:bg-white/30 transition-colors duration-150 right-12 md:right-16 top-[4px]"
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
          recentSearch={recentSearch}
          className={cn(
            "absolute  w-[187px] lg:w-[209px] h-full lg:relative max-h-[90%] overflow-y-auto",
            !openSection && "hidden lg:flex"
          )}
        />
      </div>
    </div>
  );
}
function MsgContainer({
  botMsg,
  userMsg,
}: {
  botMsg: string;
  userMsg: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col-reverse md:max-w-[90%] mx-auto gap-6 md:px-4 py-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full flex gap-3 items-start"
      >
        <div className="flex-1 md:flex items-center relative md:gap-3 gap-5 justify-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
          >
            <span className="text-white/90 text-sm break-words leading-relaxed">
              {botMsg}
            </span>
            <div className=" flex items-center justify-start absolute md:-bottom-8 bottom-2 w-full gap-3">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.6,
                }}
                className="bg-white/20 text-sm w-fit px-3 py-1 text-white rounded-full flex gap-2"
              >
                <Image
                  src="/honeypot.svg"
                  alt="Honeypot"
                  width={16}
                  height={16}
                />
                <span>Honeypot</span>
              </motion.span>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.7,
                }}
                className="bg-white/20 md:text-sm  text-[10px] w-fit px-3 py-1 text-white rounded-full flex gap-2"
              >
                <Image src="/safe.svg" alt="Honeypot" width={16} height={16} />
                <span>Safe to Buy</span>
              </motion.span>
            </div>

            <span className="absolute md:-bottom-8 bottom-2 right-12 text-sm">
              30 min ago
            </span>
          </motion.div>
          <div className="flex gap-1 mt-2 relative -bottom-8 md:mt-0 md:flex-col justify-center items-center">
            {[
              { src: "/share.svg", alt: "Share" },
              { src: "/copy.svg", alt: "Copy" },
              { src: "/pump.svg", alt: "Bybit" },
              { src: "/x.svg", alt: "X" },
              { src: "/dex-white.svg", alt: "DEX" },
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
                  <Image src={icon.src} alt={icon.alt} width={16} height={16} />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex gap-3 items-start justify-end"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-fit bg-white/5 p-4 rounded-s-full rounded-tr-full border border-white/5 overflow-hidden break-words max-w-full"
        >
          <span className="text-white/90 text-sm break-words leading-relaxed">
            {userMsg}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
