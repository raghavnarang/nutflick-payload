"use client";

import Edit from "@/components/Icons/edit";
import Button from "@/components/button";
import Textbox from "@/components/form/textbox";
import { editCategory } from "@/features/server/actions/admin/category";
import { useToast } from "@/features/toast";
import { ProductCategory } from "@/shared/types/product-category";
import { FC, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import DeleteCategory from "./delete";

interface CategoryTableItemProps {
  category: ProductCategory;
}

interface EditCategoryProps extends CategoryTableItemProps {
  onCancel: () => void;
}

const EditFormControls: FC<EditCategoryProps> = ({ category, onCancel }) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-between">
      <input type="hidden" value={category.id} name="id" />
      <Textbox
        name="title"
        placeholder="New Category Title"
        required
        disabled={pending}
        defaultValue={category.name}
        autoFocus
      />
      <div className="flex gap-3 items-center">
        <Button isInfo small disabled={pending} type="submit">
          Save
        </Button>
        <Button isSecondary small disabled={pending} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

const EditCategory: FC<EditCategoryProps> = ({ category, onCancel }) => {
  const [result, action] = useFormState(editCategory, null);

  const { addToast } = useToast();
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });

      onCancel();
    }
  }, [result]);

  return (
    <tr>
      <td className="py-2 px-4">{category.id}</td>
      <td className="py-2 px-4">
        <form action={action}>
          <EditFormControls category={category} onCancel={onCancel} />
        </form>
      </td>
    </tr>
  );
};

const CategoryTableItem: FC<CategoryTableItemProps> = ({ category }) => {
  const [isEdit, setEdit] = useState(false);

  if (isEdit) {
    return <EditCategory category={category} onCancel={() => setEdit(false)} />;
  }

  return (
    <tr>
      <td className="py-2 px-4">{category.id}</td>
      <td className="py-2 px-4 flex justify-between">
        <span>{category.name}</span>
        <div className="flex gap-3 items-center">
          <Button isInfo small icon={Edit} onClick={() => setEdit(true)}>
            Edit
          </Button>
          <DeleteCategory id={category.id} name={category.name} />
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableItem;
