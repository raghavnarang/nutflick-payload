import Button from "@/components/button";
import { useState, type FC } from "react";

interface VariantActionProps {
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const VariantActions: FC<VariantActionProps> = ({
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="mt-5 flex flex-col lg:flex-row justify-between gap-3">
      <div className="flex gap-3">
        {onMoveUp && (
          <Button
            isSecondary
            onClick={(e) => {
              e.preventDefault();
              onMoveUp();
            }}
          >
            Move Up
          </Button>
        )}
        {onMoveDown && (
          <Button
            isSecondary
            onClick={(e) => {
              e.preventDefault();
              onMoveDown();
            }}
          >
            Move Down
          </Button>
        )}
      </div>
      {onDelete && (
        <div>
          {!confirm && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setConfirm(true);
              }}
            >
              Delete
            </Button>
          )}
          {confirm && (
            <div className="flex justify-between items-center gap-3">
              <span>Delete this variant?</span>
              <div className="flex gap-3">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                >
                  Yes
                </Button>
                <Button
                  isSecondary
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirm(false);
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantActions;
