import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { uz } from "date-fns/locale";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Button } from "@mui/material";
import AnimModal from "./modal";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
  onSubmit: (start_date: string, end_date: string) => void;
}

const getFirstDateOfCurrentMonth = () => {
  const today = new Date();
  today.setDate(1);
  return today;
};

const SelectDateRage: React.FC<Props> = ({
  open,
  setOpen,
  onSubmit,
  isLoading,
}) => {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: getFirstDateOfCurrentMonth(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;

        if (activeElement && typeof activeElement.blur === "function") {
          activeElement.blur();
        }
      }, 50);
    }
  }, [open]);

  const startDate = format(range?.[0]?.startDate as Date, "yyyy-MM-dd");
  const endDate = format(range?.[0]?.endDate as Date, "yyyy-MM-dd");

  const handleConfirm = () => {
    setOpen(false);
    if (startDate === endDate) {
      onSubmit(startDate, "");
    } else {
      onSubmit(startDate, endDate);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setRange([
      {
        startDate: getFirstDateOfCurrentMonth(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  return (
    <AnimModal
      open={open}
      setOpen={handleClose}
      content={
        <>
          <div className="max-w-[400px] flex flex-col gap-3">
            <h2 className=" text-black text-xl font-medium">
              Sana oralig&lsquo;ini tanlang
            </h2>
            <div className="flex justify-center w-full">
              <DateRange
                minDate={new Date(2025, 0, 1)}
                maxDate={new Date()}
                editableDateInputs={false}
                onChange={(item) => setRange([item?.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
                locale={uz}
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="contained"
                className="flex gap-2"
                onClick={handleConfirm}
              >
                <span>{isLoading ? "Saqlanmoqda..." : "Saqlash"}</span>
              </Button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default SelectDateRage;
