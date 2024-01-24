import ProductVariants from "@/components/admin/product-variants";
import ImageUpload from "@/components/form/image-upload";
import Textarea from "@/components/form/textarea";
import Textbox from "@/components/form/textbox";

const Products = () => {
  return (
    <form>
      <h1 className="text-xl mb-5 font-medium">Add Product</h1>
      <div className="flex gap-10 flex-col md:flex-row">
        <div className="md:w-1/2 max-w-sm">
          <Textbox
            name="title"
            label="Title"
            placeholder="Add Product Title"
            inputWrapperClassName="mb-5"
            required
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Add Product Description"
            className="mb-5"
          />
          <ImageUpload name="image" label="Product Image" />
        </div>
        <div className="md:w-1/2 lg:w-full">
          <h2 className="mb-2">Variants</h2>
          <ProductVariants />
        </div>
      </div>
    </form>
  );
};

export default Products;
