import { KeyboardArrowDown } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

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

  // const { data: filials } = useQuery<IFilial[]>({
  //   queryKey: ["filials"],
  //   queryFn: fetchFilials,
  //   refetchOnWindowFocus: false,
  //   staleTime: 1000 * 60 * 5,
  // });

  const filials = useMemo(()=> {
    return [
      {
        name: "filial 1",
        id: "1"
      },
      {
        name: "filial 2",
        id: "2"
      },
      {
        name: "filial 3",
        id: "3"
      },
    ]
  },[])

  // Convert API response to options array
  const options =
    filials?.map((filial) => ({
      value: filial.id,
      label: filial.name,
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
    if (filials?.length === 1) {
      setSelectedValues([filials[0].id]);
    }
  }, [filials, setSelectedValues]);

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
            className="absolute top-[45px] w-full bg-white shadow-lg rounded-lg overflow-hidden z-50 p-2 border"
          >
            <div className="flex flex-col w-full">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-3 w-full cursor-pointer rounded-md py-2 hover:bg-gray-100"
                  htmlFor={option.value}
                >
                  <Checkbox
                    id={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                    className="mr-2"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: selectedValues.includes(option.value) ? "#4D7CFF" : "",
                      borderColor: selectedValues.includes(option.value) ? "#4D7CFF" : "",
                    }}
                  />
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
