import ProductGrid from "@/components/product/product-grid";
import { fetchProductsForGrid } from "@/features/server/common/product";

export const metadata = {
  description:
    "Elevate your snacking with Nutflick - India's top destination for premium dry fruits and nuts. Shop now for a taste of excellence!",
  openGraph: {
    type: "website",
  },
};

const Home = async () => {
  const products = await fetchProductsForGrid();
  return <ProductGrid products={products} />;
};

export default Home;
