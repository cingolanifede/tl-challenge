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
  const lines = Object.entries(breakpoints);

  const convertToPercentage = (actual: number, highest: any): number => {
    try {
      const lastIx = highest.length - 1;
      return highest !== 0 ? (100 * actual) / highest[lastIx][1] : actual;
    } catch (error) {
      return 0;
    }
  };

  return (
    <div className="py-10">
      <div className="w-full bg-[#ECDACB] rounded-full h-3 relative">
        {lines.map((l, index) =>
          index === 3 ? (
            <div key={index}>
              <div
                className={`absolute -right-1 -ml-0.5 w-0.5 h-3 bg-white`}
              ></div>
              <div
                className={`absolute -right-4 -bottom-7 text-gray-500 ${
                  actualDiscount > l[1] ? "font-bold" : ""
                }`}
              >
                ${l[1]} off
              </div>
            </div>
          ) : (
            <div key={index}>
              <div
                className={`absolute left-${index + 1}/${
                  lines.length
                } -ml-0.5 w-1 h-3 bg-white`}
              ></div>
              <div
                className={`absolute left-${index + 1}/${
                  lines.length
                } -bottom-7 -ml-9 text-gray-500 ${
                  actualDiscount > l[1] ? "font-bold" : ""
                }`}
              >
                ${l[1]} off
              </div>
            </div>
          )
        )}
        <div
          className="bg-[#F44040] h-3 rounded-full"
          style={{ width: `${convertToPercentage(actualDiscount, lines)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DiscountProcessBar;
