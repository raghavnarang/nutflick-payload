import Link from "next/link";

const EmptyCart = () => (
  <div>
    <p>No Items in Cart</p>
    <Link
      href="/"
      className="bg-red-500 text-white px-4 py-2 rounded-sm inline-block mt-5"
    >
      Go to Home
    </Link>
  </div>
);

export default EmptyCart;
