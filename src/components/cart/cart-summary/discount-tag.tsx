import Cross from "@/components/Icons/cross";
import { type FC } from "react";
import cx from "clsx";

interface DiscountTagProps {
  code: string;
}

const DiscountTag: FC<DiscountTagProps> = ({ code }) => {
  return (
    <form className="relative">
      <div
        className={cx(
          "text-xs flex items-center bg-gray-200 rounded-full pl-1",
          {
            "opacity-50": false,
          }
        )}
      >
        <span className="px-1">{code.toUpperCase()}</span>
        <button type="submit" disabled={false}>
          <Cross className="text-gray-500 hover:text-gray-600" />
        </button>
      </div>
    </form>
  );
};

export default DiscountTag;
