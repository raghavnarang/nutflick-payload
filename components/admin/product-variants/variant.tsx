import type { FC } from "react";
import Textbox from "@/components/form/textbox";
import ImageUpload from "@/components/form/image-upload";
import cx from "classnames";
import VariantActions from "./variant-actions";

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
        className={cx("flex items-start gap-5", {
          "border-b border-gray-300 pb-5": hasActions,
        })}
      >
        <ImageUpload minimal name={`${name}[image]`} />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
          <Textbox
            label="Title"
            name={`${name}[title]`}
            placeholder="Variant Title"
            required
          />
          <Textbox
            label="Weight"
            name={`${name}[weight]`}
            placeholder="0.0"
            decimal
            suffix="Kg"
            required
          />
          <Textbox
            label="Price"
            name={`${name}[price]`}
            placeholder="0.0"
            decimal
            prefix="₹"
            required
          />
          <Textbox
            label="Compare price"
            name={`${name}[comparePrice]`}
            placeholder="0.0"
            decimal
            prefix="₹"
          />
          <Textbox
            label="Shipping cost"
            name={`${name}[includedShippingCost]`}
            placeholder="0.0"
            decimal
            prefix="₹"
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
