import React from "react";
import { DiscountProgressConfig } from "../../types";

interface DiscountProcessBarProps {
  actualDiscount: number;
  breakpoints: DiscountProgressConfig;
}

const DiscountProcessBar: React.FunctionComponent<DiscountProcessBarProps> = ({
  actualDiscount,
  breakpoints,
}) => {
  const convertToPercentage = (actual: number, highest: any): string => {
    try {
      const lastIx = highest.length - 1;
      return highest !== 0 ? (100 * actual) / highest[lastIx][1] : actual;
    } catch (error) {
      return 0;
    }
  };
  const drawLines = (index: number, price: number) => {
    let v1 = null;
    let v2 = null;
    // We do it this way as we can't make dynamic classes, sometimes don't work
    switch (index) {
      case 0:
        v1 = v2 = "left-1/4";
        break;
      case 1:
        v1 = v2 = "left-2/4";
        break;
      case 2:
        v1 = v2 = "left-3/4";
        break;
      case 3:
        v1 = "-right-1";
        v2 = "-right-4";
        break;
    }
    return (
      <>
        <div className={`absolute ${v1} -ml-0.5 w-0.5 h-3 bg-white`}></div>
        <div
          className={`absolute ${v2} -ml-9 -bottom-7 text-gray-500 ${
            actualDiscount >= price ? "font-bold text-black" : ""
          }`}
        >
          ${price} off
        </div>
      </>
    );
  };

  const lines = Object.entries(breakpoints);
  const percentage = convertToPercentage(actualDiscount, lines);

  return (
    <div
      className="w-full bg-[#ECDACB] rounded-full h-3 relative"
      placeholder={percentage}
    >
      {lines.map((l, index) => drawLines(index, l[1]))}
      <div
        className="bg-[#F44040] h-3 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default DiscountProcessBar;
