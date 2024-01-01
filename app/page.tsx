import ProductGrid from "@/components/product/product-grid";
import { getProducts } from "@/lib/shopify";

const Home = async () => {
  const products = await getProducts({});
  return <ProductGrid products={products} />;
};

export default Home;
