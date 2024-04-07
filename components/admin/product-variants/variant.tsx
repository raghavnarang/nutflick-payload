import type { FC } from "react";
import Textbox from "@/components/form/textbox";
import ImageUpload from "@/components/form/image-upload";
import cx from "classnames";
import VariantActions from "./variant-actions";
import type { ProductVariant } from "@/shared/types/product";

interface VariantProps {
  name?: string;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  editVariant?: ProductVariant;
}

const Variant: FC<VariantProps> = ({
  name = "variant",
  onDelete,
  onMoveUp,
  onMoveDown,
  editVariant,
}) => {
  const hasActions = !!onDelete || !!onMoveUp || !!onMoveDown;

  return (
    <div className="py-5 px-7 mb-5 border border-gray-300 rounded-md bg-gray-100">
      <div
        className={cx("flex items-start gap-5", {
          "border-b border-gray-300 pb-5": hasActions,
        })}
      >
        <ImageUpload
          minimal
          name={`${name}[image]`}
          src={editVariant?.image || undefined}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
          <Textbox
            label="Title"
            name={`${name}[title]`}
            placeholder="Variant Title"
            defaultValue={editVariant?.title}
            required
          />
          <Textbox
            label="Weight"
            name={`${name}[weight]`}
            placeholder="0.0"
            decimal
            suffix="Kg"
            required
            defaultValue={editVariant?.weight}
          />
          <Textbox
            label="Price"
            name={`${name}[price]`}
            placeholder="0.0"
            decimal
            prefix="₹"
            required
            defaultValue={editVariant?.price}
          />
          <Textbox
            label="Compare price"
            name={`${name}[compare_price]`}
            placeholder="0.0"
            decimal
            prefix="₹"
            defaultValue={editVariant?.compare_price || undefined}
          />
          <Textbox
            label="Shipping cost"
            name={`${name}[included_shipping_cost]`}
            placeholder="0.0"
            decimal
            prefix="₹"
            defaultValue={editVariant?.included_shipping_cost || undefined}
          />
          {editVariant && (
            <input type="hidden" name={`${name}[id]`} value={editVariant.id} />
          )}
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
