import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Close } from "@mui/icons-material";


const AnimModal = ({
  open,
  setOpen,
  content,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: JSX.Element;
}) => {
  const router = useRouter();

  // Close modal on Escape key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // if (event.key === "Escape") {
    //     setOpen(false);
    // }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#000000a7] bg-opacity-50 backdrop-blu-sm z-40 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          {/* Modal Content */}
          <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute w-full max-w-md p-6 bg-white rounded-lg shadow-lg "
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <Close className="w-5 h-5" />
              </button>
              {content}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimModal;
