import type { FC } from "react";

interface EditProductProps {
  params: { slug: string };
}

const EditProduct: FC<EditProductProps> = ({ params: { slug } }) => {
  return <h1>Edit Product</h1>;
};

export default EditProduct;
