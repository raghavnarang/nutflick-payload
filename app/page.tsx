import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/shopify";

const Home = async () => {
  const products = await getProducts({});
  return <ProductGrid products={products} />;
};

export default Home;
