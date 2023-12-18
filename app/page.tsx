import ProductItem from "@/components/product/product-item";

const Home = () => {
  return (
    <div className="flex flex-wrap gap-10 w-auto justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
        <ProductItem
          name="Pishori Badam Giri"
          image="/product.webp"
          id={`${id}`}
          category={{ name: "Almonds Kernels", id: "1", slug: 'almonds' }}
          price={500}
          comparePrice={1000}
          key={id}
          slug='pishori-giri'
        />
      ))}
    </div>
  );
};

export default Home;
