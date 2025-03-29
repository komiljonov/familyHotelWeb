import { fetchBranchs } from "@/lib/actions/branchs.action";
import { IBranch } from "@/lib/types/branch.types";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect,  useRef, useState } from "react";

export default function SelectBranchs({
  selectedValues,
  setSelectedValues,
}: {
  selectedValues: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const user_id = (useRouter()?.query?.user_id as string) || "";

  const { data: branchs } = useQuery<IBranch[]>({
    queryKey: ["branchs", user_id],
    queryFn:()=> fetchBranchs(user_id),
    enabled: !!user_id,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });


  // Convert API response to options array
  const options =
  branchs?.map((branch) => ({
      value: branch?.id,
      label: branch?.name,
    })) || [];

  // Handle selection changes
  const handleChange = (value: string) => {
    setSelectedValues((prevSelectedValues) => {
      const newSelectedValues = prevSelectedValues.includes(value)
        ? prevSelectedValues.filter((val) => val !== value)
        : [...prevSelectedValues, value];

      localStorage.setItem("selectedBranchs", JSON.stringify(newSelectedValues));
      return newSelectedValues;
    });
  };

  // Automatically select the only available filial
  useEffect(() => {
    if (branchs?.length === 1) {
      setSelectedValues([branchs[0].id]);
    }
  }, [branchs, setSelectedValues]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Display selected filials
  const displaySelectedValues =
    selectedValues?.length > 0
      ? selectedValues
        .slice(0, 1)
        .map((value) => options.find((option) => option.value === value)?.label)
        .join(", ") +
      (selectedValues?.length > 1 ? ` va ${selectedValues.length - 1} ta filiallar` : "")
      : "Filiallarni tanlang";

  return (
    <div className="relative flex justify-center w-full sm:max-w-[450px]" ref={selectRef}>
      <button
        ref={buttonRef}
        className="w-full p-2 px-4 text-sm flex items-center justify-between border rounded-xl   bg-[#DAE8FF]"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
        {displaySelectedValues}
        <KeyboardArrowDown className="text-gray-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[45px] w-full shadow-lg rounded-lg overflow-hidden  bg-[#F7F7F7] z-50 p-3 border"
          >
            <div className="flex flex-col w-full gap-1">
              {options.map((option, index) => (
              <label
              key={option.value}
              className={`${index === options.length - 1 ? "border-0" : "border-b"} flex items-center gap-3  w-full cursor-pointer py-2 hover:bg-gray-100`}
              htmlFor={option.value}
              onClick={() => handleChange(option.value)}  // ✅ Move onChange to onClick
            >
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  selectedValues.includes(option.value)
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedValues.includes(option.value) && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              {option.label}
            </label>
            
            
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
