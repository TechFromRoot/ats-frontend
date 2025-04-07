import { cn } from "@/lib/utils";
import Image from "next/image";
export function Badge({
  text,
  src,
  className,
  isLoading,
}: {
  text?: string;
  src?: string;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center px-2    whitespace-nowrap w-full bg-white/5 h-[43px] text-[16px] max-w-[220px] rounded-full space-x-2 ",
        className,
        isLoading && " animate-pulse"
      )}
    >
      {src ? (
        <Image
          alt="src"
          src={src}
          width={20}
          height={20}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-white/10"></div>
      )}
      <span className=" text-white">{text}</span>
    </div>
  );
}
