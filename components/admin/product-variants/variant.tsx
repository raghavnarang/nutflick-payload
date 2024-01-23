import type { FC } from "react";
import Textbox from "@/components/form/textbox";
import ImageUpload from "@/components/form/image-upload";
import cx from "classnames";
import VariantActions from "./actions";

interface VariantProps {
  name?: string;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const Variant: FC<VariantProps> = ({
  name = "variant",
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const hasActions = !!onDelete || !!onMoveUp || !!onMoveDown;

  return (
    <div className="py-5 px-7 mb-5 border border-gray-300 rounded-md bg-gray-100">
      <div
        className={cx("flex justify-stretch items-center gap-7", {
          "border-b border-gray-300 pb-5": hasActions,
        })}
      >
        <div className="rounded size-12 bg-gray-300 flex justify-center items-center flex-shrink-0">
          <ImageUpload minimal name={`${name}[image]`} />
        </div>
        <div className="grid grid-cols-5 gap-7 w-full">
          <Textbox
            label="Title"
            name={`${name}[title]`}
            placeholder="Variant Title"
          />
          <Textbox
            label="Weight (in Kgs)"
            name={`${name}[weight]`}
            placeholder="0.0"
          />
          <Textbox
            label="Price (₹)"
            name={`${name}[price]`}
            placeholder="0.0"
          />
          <Textbox
            label="Compare at price (₹)"
            name={`${name}[comparePrice]`}
            placeholder="0.0"
          />
          <Textbox
            label="Shipping cost (₹)"
            name={`${name}[includedShippingCost]`}
            placeholder="0.0"
          />
        </div>
      </div>
      {hasActions && (
        <VariantActions
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      )}
    </div>
  );
};

export default Variant;
