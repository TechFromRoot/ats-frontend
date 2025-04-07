import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-3 items-center justify-center h-full w-full"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-primary" />
      </motion.div>
      <p className=" text-sm text-primary/80 font-random">ATS...</p>
    </motion.div>
  );
}
