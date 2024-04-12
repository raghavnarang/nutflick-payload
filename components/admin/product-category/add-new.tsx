"use client";

import Button from "@/components/button";
import Textbox from "@/components/form/textbox";
import { addCategory } from "@/features/server/actions/admin/category";
import { useToast } from "@/features/toast";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const FormInside = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Textbox
        name="title"
        label="Title"
        placeholder="New Category Title"
        inputWrapperClassName="mb-5"
        required
        disabled={pending}
      />
      <Button isInfo type="submit">
        Add Category
      </Button>
    </>
  );
};

const AddNewCategory = () => {
  const [result, action] = useFormState(addCategory, null);

  const { addToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (result) {
      addToast({
        id: Date.now(),
        message: result.message,
        isDismissable: true,
        type: result.status,
      });

      formRef.current?.reset();
    }
  }, [result]);

  return (
    <form action={action} ref={formRef}>
      <FormInside />
    </form>
  );
};

export default AddNewCategory;
